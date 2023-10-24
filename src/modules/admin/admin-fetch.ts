import { Request } from "lib/request";
import {
  TAddEpisode,
  TAddLanguage,
  TAddNewMovie,
  TAddSeason,
  TDeleteEpisode,
  TDeleteLanguage,
  TDeleteMovie,
  TDeleteResolution,
  TDeleteSeason,
  TEditLanguage,
  TEditSeason,
  TGetCategories,
  TGetDirectors,
  TGetMovie,
  TGetStudios,
  TGetTags,
  TgetMovies,
} from "./admin-type";
import { AddMovieFields } from "pages/admin/movies/add-movie";
import { AddEpisodeFields } from "./edit-movie/episodes/forms/add-episode-form";
import { AddLanguageFields } from "./edit-movie/languages/forms/add-language-form";
import { AddResolutionFields } from "./edit-movie/resolutions/forms/add-resolution-form";

export const addNewMovie = async ({ movie }: { movie: AddMovieFields }) =>
  Request<TAddNewMovie>("/movies", "POST", { ...movie }, true);

export const editMovie = async ({
  movie,
  id,
}: {
  movie: AddMovieFields;
  id: string;
}) => Request<TAddNewMovie>(`/movies/${id}`, "PATCH", { ...movie }, true);

export const getMovies = async ({ page }: { page: number }) =>
  Request<TgetMovies>(`/movies?page=${page}`, "GET", null, true);

export const getEditMovie = async ({ movieId }: { movieId: string }) =>
  Request<TGetMovie>(`/movies/${movieId}`, "GET", null, false);

export const getTags = async () =>
  Request<TGetTags>(`/tags`, "GET", null, true);
export const getDirectors = async () =>
  Request<TGetDirectors>(`/directors`, "GET", null, true);
export const getStudios = async () =>
  Request<TGetStudios>(`/studios`, "GET", null, true);
export const getCategories = async () =>
  Request<TGetCategories>(`/categories`, "GET", null, true);

export const addSeason = async ({ title, id }: { title: string; id: string }) =>
  Request<TAddSeason>(`/movies/${id}/seasons`, "POST", { title }, true);

export const editSeason = async ({
  title,
  movieId,
  seasonId,
}: {
  title: string;
  movieId: string;
  seasonId: string;
}) =>
  Request<TEditSeason>(
    `/movies/${movieId}/seasons/${seasonId}`,
    "PATCH",
    {
      title,
    },
    true
  );

export const deleteSeason = async ({
  movieId,
  seasonId,
}: {
  movieId: string;
  seasonId: string;
}) =>
  Request<TDeleteSeason>(
    `/movies/${movieId}/seasons/${seasonId}`,
    "DELETE",
    null,
    true
  );

export const addEpisode = async ({
  episode,
  seasonId,
}: {
  episode: AddEpisodeFields;
  seasonId: string;
}) =>
  Request<TAddEpisode>(
    `/seasons/${seasonId}/episodes`,
    "POST",
    {
      ...episode,
    },
    true
  );

export const editEpisode = async ({
  episode,
  episodeId,
}: {
  episode: AddEpisodeFields;
  episodeId: string;
}) =>
  Request<TAddEpisode>(
    `/episodes/${episodeId}`,
    "PATCH",
    {
      ...episode,
    },
    true
  );

export const deleteEpisode = async ({ episodeId }: { episodeId: string }) =>
  Request<TDeleteEpisode>(`/episodes/${episodeId}`, "DELETE", null, true);
export const addLanguage = async ({
  language,
  episodeId,
}: {
  language: AddLanguageFields;
  episodeId: string;
}) =>
  Request<TAddLanguage>(
    `/episodes/${episodeId}/languages`,
    "POST",
    {
      ...language,
    },
    true
  );

export const editLanguage = async ({
  language,
  languageId,
}: {
  language: AddLanguageFields;
  languageId: string;
}) =>
  Request<TEditLanguage>(
    `/languages/${languageId}`,
    "PATCH",
    {
      ...language,
    },
    true
  );

export const deleteLanguage = async ({ languageId }: { languageId: string }) =>
  Request<TDeleteLanguage>(`/languages/${languageId}`, "DELETE", null, true);

export const addResolution = async ({
  resolution,
  languageId,
}: {
  resolution: AddResolutionFields;
  languageId: string;
}) =>
  Request<TAddLanguage>(
    `/languages/${languageId}/resolutions`,
    "POST",
    {
      ...resolution,
    },
    true
  );

export const editResolution = async ({
  resolution,

  resolutionId,
}: {
  resolution: AddResolutionFields;

  resolutionId: string;
}) =>
  Request<TAddLanguage>(
    `/resolutions/${resolutionId}`,
    "PATCH",
    {
      ...resolution,
    },
    true
  );

export const deleteResolution = async ({
  resolutionId,
}: {
  resolutionId: string;
}) =>
  Request<TDeleteResolution>(
    `/resolutions/${resolutionId}`,
    "DELETE",
    null,
    true
  );

export const deleteMovie = async ({ movieId }: { movieId: string }) =>
  Request<TDeleteMovie>(`/movies/${movieId}`, "DELETE", null, true);
