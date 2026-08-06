import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, Router as WouterRouter } from "wouter";
import OceanScene from "@/components/ocean/OceanScene";
import NicknameModal from "@/components/ocean/NicknameModal";

interface OceanUser { id: number; nickname: string; bubbleCount: number; }

const queryClient = new QueryClient();

function AppInner() {
  const [user, setUser] = useState<OceanUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("ocean_user_id");
    const storedNick = localStorage.getItem("ocean_nickname");
    if (storedId && storedNick) {
      setUser({ id: Number(storedId), nickname: storedNick, bubbleCount: 0 });
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <>
      {!user && <NicknameModal onComplete={(u) => setUser(u)} />}
      <Switch>
        <Route path="/" component={() => <OceanScene currentUser={user} />} />
        <Route component={() => <OceanScene currentUser={user} />} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppInner />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
