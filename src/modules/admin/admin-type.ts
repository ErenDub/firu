export type TAddNewMovie = { _id: number };
export type TGetMoviesItem = {
  poster: string;
  banner: string;
  title: string;
  titleEn: string;
  year: number;
  seasonsCount: number;
  lastSeasonEpCount: number;
  id: string;
};
export type TgetMovies = {
  total: number;
  movies: Array<TGetMoviesItem>;
};
export type TResolution = {
  id: string;
  player: boolean;
  resolution: string;
  url: string;
};
export type TLanguage = {
  id: string;
  language: string;
  resolutions: Array<TResolution>;
};
export type TEpisode = {
  id: string;
  title: string;
  duration: number;
  openingStart: number;
  openingEnd: number;
  poster: string;
  end: number;
  languages: Array<TLanguage>;
};
export type TSeason = {
  id: string;
  title: string;
  episodes: Array<TEpisode>;
};
export type TMovie = {
  id: string;
  title: string;
  titleEn: string;
  year: number;
  poster: string;
  banner: string;
  logo: string;
  country: string;
  description: string;
  duration: number;
  imdb: string;
  age: string;
  type: string;
  lastSeasonEpCount: string;
  visible: boolean;
  commentsCount: number;
  viewsCount: number;
  likesCount: number;
  languages: Array<string>;
  episodesCount: number;
  seasonsCount: number;
  directors: Array<string>;
  studios: Array<string>;
  categories: Array<string>;
  tags: Array<string>;
};
export type TGetMovie = {
  seasons: Array<TSeason>;
} & TMovie;
export type TGetTags = Array<string>;
export type TGetDirectors = Array<string>;
export type TGetStudios = Array<string>;
export type TGetCategories = Array<string>;
export type TAddSeason = {};
export type TEditSeason = {};
export type TDeleteSeason = {};
export type TAddEpisode = {};
export type TEditEpisode = {};
export type TDeleteEpisode = {};
export type TAddLanguage = {};
export type TEditLanguage = {};
export type TDeleteLanguage = {};
export type TAddResolution = {};
export type TEditResolution = {};
export type TDeleteResolution = {};