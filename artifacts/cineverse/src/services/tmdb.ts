export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  original_language: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number | null;
  tagline: string;
  status: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB<T>(endpoint: string): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getTrending(page: number = 1): Promise<TMDBResponse> {
  return fetchTMDB<TMDBResponse>(`/trending/movie/week?page=${page}`);
}

export async function getPopular(page: number = 1): Promise<TMDBResponse> {
  return fetchTMDB<TMDBResponse>(`/movie/popular?page=${page}`);
}

export async function getTopRated(page: number = 1): Promise<TMDBResponse> {
  return fetchTMDB<TMDBResponse>(`/movie/top_rated?page=${page}`);
}

export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse> {
  if (!query) return { results: [], page: 1, total_pages: 1, total_results: 0 };
  return fetchTMDB<TMDBResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchTMDB<MovieDetails>(`/movie/${id}`);
}

export async function getMovieCredits(id: number): Promise<{ cast: CastMember[] }> {
  return fetchTMDB<{ cast: CastMember[] }>(`/movie/${id}/credits`);
}

export async function getMovieVideos(id: number): Promise<{ results: Video[] }> {
  return fetchTMDB<{ results: Video[] }>(`/movie/${id}/videos`);
}

export function getPosterUrl(path: string | null, size: 'w185' | 'w342' | 'w500' | 'original' = 'w500'): string {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w780' | 'w1280' | 'original' = 'original'): string {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
