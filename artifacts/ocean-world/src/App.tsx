import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import OceanScene from '@/components/ocean/OceanScene';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={OceanScene} />
      <Route component={OceanScene} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
