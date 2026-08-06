import { Router, type IRouter } from "express";
import { eq, gt, sql } from "drizzle-orm";
import { db, oceanUsersTable } from "@workspace/db";
import {
  RegisterUserBody,
  PopBubbleParams,
  GetLeaderboardQueryParams,
  RegisterUserResponse,
  PopBubbleResponse,
  GetLeaderboardResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// POST /users/register
router.post("/users/register", async (req, res): Promise<void> => {
  const parsed = RegisterUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [user] = await db
    .insert(oceanUsersTable)
    .values({ nickname: parsed.data.nickname, bubbleCount: 0 })
    .returning();

  res.status(201).json(RegisterUserResponse.parse({ id: user.id, nickname: user.nickname, bubbleCount: user.bubbleCount }));
});

// POST /users/:userId/pop
router.post("/users/:userId/pop", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
  const params = PopBubbleParams.safeParse({ userId: Number(raw) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [user] = await db
    .update(oceanUsersTable)
    .set({ bubbleCount: sql`${oceanUsersTable.bubbleCount} + 1` })
    .where(eq(oceanUsersTable.id, params.data.userId))
    .returning();

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(PopBubbleResponse.parse({ id: user.id, nickname: user.nickname, bubbleCount: user.bubbleCount }));
});

// GET /leaderboard
router.get("/leaderboard", async (req, res): Promise<void> => {
  const queryParsed = GetLeaderboardQueryParams.safeParse(req.query);
  const userId = queryParsed.success ? queryParsed.data.userId : undefined;

  const topTen = await db
    .select()
    .from(oceanUsersTable)
    .orderBy(sql`${oceanUsersTable.bubbleCount} DESC`)
    .limit(10);

  const topTenWithRank = topTen.map((u, i) => ({
    rank: i + 1,
    id: u.id,
    nickname: u.nickname,
    bubbleCount: u.bubbleCount,
  }));

  let myEntry = null;
  if (userId != null) {
    const [me] = await db
      .select()
      .from(oceanUsersTable)
      .where(eq(oceanUsersTable.id, userId));

    if (me) {
      const [{ count }] = await db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(oceanUsersTable)
        .where(gt(oceanUsersTable.bubbleCount, me.bubbleCount));

      myEntry = {
        rank: count + 1,
        id: me.id,
        nickname: me.nickname,
        bubbleCount: me.bubbleCount,
      };
    }
  }

  res.json(GetLeaderboardResponse.parse({ topTen: topTenWithRank, myEntry }));
});

export default router;
