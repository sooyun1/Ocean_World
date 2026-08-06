import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const oceanUsersTable = pgTable("ocean_users", {
  id: serial("id").primaryKey(),
  nickname: text("nickname").notNull(),
  bubbleCount: integer("bubble_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertOceanUserSchema = createInsertSchema(oceanUsersTable).omit({
  id: true,
  createdAt: true,
});
export type InsertOceanUser = z.infer<typeof insertOceanUserSchema>;
export type OceanUser = typeof oceanUsersTable.$inferSelect;
