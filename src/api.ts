const API_KEY = "802f1bd51dca47d68d95c3741283bbaa";
const BASE_URL = "https://api.themoviedb.org/3";

interface IInfo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_data: string;
  title: string;
  video: boolean;
  vote_count: number;
}

interface IInfo2 {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string;
}

export interface IPopularMovies {
  page: number;
  results: IInfo[];
}

export interface ISearch {
  page: number;
  results: IInfo[];
}

export interface ITrendingWeek {
  page: number;
  results: IInfo[];
}

export interface ITrendingDay {
  page: number;
  results: IInfo[];
}

export interface IonAirTv {
  page: number;
  results: IInfo2[];
}

// page값을 props로
export function getPopularMovies(pageNumber: number) {
  return fetch(
    `${BASE_URL}/movie/popular?language=ko&page=${pageNumber}&api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function makeImagePath(id: string | undefined, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function multiSearch(keyword: any) {
  return fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=ko&page=1`
  ).then((response) => response.json());
}

export function getTrendingWeek() {
  return fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getTrendingDay() {
  return fetch(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getonAirTV() {
  return fetch(
    `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko&page=1`
  ).then((response) => response.json());
}
