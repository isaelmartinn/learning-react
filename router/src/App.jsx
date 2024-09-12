import { lazy, Suspense } from "react";

import "./App.css";
import Page404 from "./pages/Page404";
import { Router } from "./Router";
import Search from "./pages/Search";
import { Route } from "./Route";

const LazyHomePage = lazy(() => import("./pages/Home"));
const LazyAboutPage = lazy(() => import("./pages/About"));

const routes = [
  {
    path: "/search/:query",
    component: Search,
  },
];

function App() {
  return (
    <main>
      <Suspense>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path="/" component={LazyHomePage} />
          <Route path="/about" component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
