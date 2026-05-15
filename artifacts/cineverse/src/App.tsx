import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider } from "./context/FavoritesContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import Home from "@/pages/Home";
import Trending from "@/pages/Trending";
import TopRated from "@/pages/TopRated";
import Search from "@/pages/Search";
import MovieDetails from "@/pages/MovieDetails";
import Favorites from "@/pages/Favorites";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/trending" component={Trending} />
      <Route path="/top-rated" component={TopRated} />
      <Route path="/search" component={Search} />
      <Route path="/movie/:id" component={MovieDetails} />
      <Route path="/favorites" component={Favorites} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <FavoritesProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </FavoritesProvider>
    </I18nextProvider>
  );
}

export default App;
