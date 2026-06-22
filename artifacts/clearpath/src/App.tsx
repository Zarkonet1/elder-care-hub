import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Start from "@/pages/Start";
import Resources from "@/pages/Resources";
import Experts from "@/pages/Experts";
import ExpertProfile from "@/pages/ExpertProfile";
import About from "@/pages/About";
import Checklist from "@/pages/Checklist";
import Intake from "@/pages/Intake";
import Brief from "@/pages/Brief";

import { Layout } from "@/components/Layout";
import { StickyNav } from "@/components/StickyNav";
import { FloatingHelp } from "@/components/FloatingHelp";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/start" component={Start} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:id" component={Resources} />
      <Route path="/experts" component={Experts} />
      <Route path="/experts/:id" component={ExpertProfile} />
      <Route path="/about" component={About} />
      <Route path="/checklist" component={Checklist} />
      <Route path="/intake" component={Intake} />
      <Route path="/intake/refine">{() => <Intake mode="refine" />}</Route>
      <Route path="/brief/:id">{(params: { id: string }) => <Brief id={params.id} />}</Route>
      <Route path="/brief" component={Brief} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <StickyNav />
            <Router />
            <FloatingHelp />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
