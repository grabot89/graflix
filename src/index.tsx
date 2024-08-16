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
import AddMovieReviewPage from './pages/addMovieReviewPage';
import ActorDetailsPage from "./pages/actorDetailsPage";
import TvShowDetailsPage from "./pages/tvShowDetailsPage";
import DiscoverTvShowsPage from "./pages/discoverTvShowsPage";
import PopularActorsPage from "./pages/popularActorsPage";
import TvShowsContextProvider from "./contexts/tvShowsContext";
import ActorsContextProvider from "./contexts/actorsContext";
import MoviesContextProvider from "./contexts/moviesContext";
import FavouriteTvShowsPage from "./pages/favouriteTvShowsPage";
import FavouriteActorsPage from "./pages/favouriteActorsPage";
import LoginPage from "./pages/loginPage";
import { AuthProvider } from "./hooks/useAuth";
import React from 'react';
import PrivateRoute from './PrivateRoute';
import Logout from './Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <ToastContainer />
        <MoviesContextProvider>
        <ActorsContextProvider>
        <TvShowsContextProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/logout' element={<Logout />} />
          <Route path="/movies/reviews/:id" element={<MovieReviewPage/>} />
          <Route path="/movies/favourites" element={<PrivateRoute Component={FavouriteMoviesPage} />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/movies/top" element={<TopMoviesPage />} />
          <Route path="/movies/popular" element={<PopularMoviesPage />} />
          <Route path="/actors/:id" element={<ActorDetailsPage />} />
          <Route path="/actors/popular" element={<PopularActorsPage />} />
          <Route path="/actors/favourites" element={<PrivateRoute Component={FavouriteActorsPage} />} />
          <Route path="/tvshows/discover" element={<DiscoverTvShowsPage />} />
          <Route path="/tvshows/favourites" element={<PrivateRoute Component={FavouriteTvShowsPage} />} />
          <Route path="/tvshows/:id" element={<TvShowDetailsPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
          </Routes>
        </TvShowsContextProvider>
        </ActorsContextProvider>
        </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)