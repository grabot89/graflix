import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopMoviesPage from "./pages/topMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import ActorDetailsPage from "./pages/actorDetailsPage";
import TvShowDetailsPage from "./pages/tvShowDetailsPage";
import DiscoverTvShowsPage from "./pages/discoverTvShowsPage";
import PopularActorsPage from "./pages/popularActorsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />
        <MoviesContextProvider>  
      <Routes>
        <Route path="/movies/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/top" element={<TopMoviesPage />} />
        <Route path="/movies/popular" element={<PopularMoviesPage />} />
        <Route path="/actors/:id" element={<ActorDetailsPage />} />
        <Route path="/actors/popular" element={<PopularActorsPage />} />
        <Route path="/tvshows/discover" element={<DiscoverTvShowsPage />} />
        <Route path="/tvshows/:id" element={<TvShowDetailsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)