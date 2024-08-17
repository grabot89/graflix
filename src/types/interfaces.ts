export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
}

export interface BaseActorProps {
  name: string;
  id: number;
  birthday: string;
  popularity: number;
  biography: string;
  place_of_birth: string;
  profile_path?: string;
  adult: boolean;
  gender: number;
}

export interface BaseTvShowProps {
  id: number;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  overview: string;
  popularity: number;
  poster_path?: string;
  imdb_id: string;
  original_language: string;
  tagline: string;
  vote_count: number;
  vote_average: number;
  first_air_date: string;
  genre_ids?: number[];
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface BaseActorListProps {
  actors: BaseActorProps[];
  action: (a: BaseActorProps) => React.ReactNode;
}

export interface BaseTvShowListProps {
  tvShows: BaseTvShowProps[];
  action: (t: BaseTvShowProps) => React.ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
}

export interface ActorDetailsProps extends BaseActorProps {
}

export interface TvShowDetailsProps extends BaseTvShowProps {
  genres: {
    id: number;
    name: string;
  }[];
  networks: {
    id: number;
    name: string;
  }[];
  production_companies: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface Image {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface CastImage extends Image {}

export interface MovieImage extends Image {}

export interface TvShowImage extends Image {}

export type MovieFilterOption = "title" | "genre" | "quality";

export type ActorFilterOption = "name";

export type TvShowFilterOption = "name" | "genre";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
}

export interface ActorListPageTemplateProps extends BaseActorListProps {
  title: string;
}

export interface TvShowListPageTemplateProps extends BaseTvShowListProps {
  title: string;
}

export interface Review {
    id: string;
    content: string
    author: string
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreData {
  genres: Genre[];
}

export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface PopularActors {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseActorProps[];
}

export interface DiscoverTvShows {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseTvShowProps[];
}

export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId: number,
}

export interface BaseMediaProps {
  id: number;
  title?: string; // Movies
  name?: string; // Actors and TV shows
  homepage?: string;
  tagline?: string; // Only applicable to movies
}