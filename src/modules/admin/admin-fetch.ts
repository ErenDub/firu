import { Request } from "lib/request";
import {
  TAddEpisode,
  TAddLanguage,
  TAddNewMovie,
  TAddSeason,
  TDeleteEpisode,
  TDeleteLanguage,
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
  Request<TAddNewMovie>("/movies", "POST", { ...movie });

export const getMovies = async ({ page }: { page: number }) =>
  Request<TgetMovies>(`/movies?page=${page}`, "GET", null);

export const getEditMovie = async ({ movieId }: { movieId: string }) =>
  Request<TGetMovie>(`/movies/${movieId}`, "GET", null);

export const getTags = async () => Request<TGetTags>(`/tags`, "GET", null);
export const getDirectors = async () =>
  Request<TGetDirectors>(`/directors`, "GET", null);
export const getStudios = async () =>
  Request<TGetStudios>(`/studios`, "GET", null);
export const getCategories = async () =>
  Request<TGetCategories>(`/categories`, "GET", null);

export const addSeason = async ({ title, id }: { title: string; id: string }) =>
  Request<TAddSeason>(`/movies/${id}/seasons`, "POST", { title });

export const editSeason = async ({
  title,
  movieId,
  seasonId,
}: {
  title: string;
  movieId: string;
  seasonId: string;
}) =>
  Request<TEditSeason>(`/movies/${movieId}/seasons/${seasonId}`, "PATCH", {
    title,
  });

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
    null
  );

export const addEpisode = async ({
  episode,
  movieId,
  seasonId,
}: {
  episode: AddEpisodeFields;
  movieId: string;
  seasonId: string;
}) =>
  Request<TAddEpisode>(
    `/movies/${movieId}/seasons/${seasonId}/episodes`,
    "POST",
    {
      ...episode,
    }
  );

export const editEpisode = async ({
  episode,
  movieId,
  seasonId,
  episodeId,
}: {
  episode: AddEpisodeFields;
  movieId: string;
  seasonId: string;
  episodeId: string;
}) =>
  Request<TAddEpisode>(
    `/movies/${movieId}/seasons/${seasonId}/episodes/${episodeId}`,
    "PATCH",
    {
      ...episode,
    }
  );

export const deleteEpisode = async ({
  episodeId,
  movieId,
  seasonId,
}: {
  episodeId: string;
  movieId: string;
  seasonId: string;
}) =>
  Request<TDeleteEpisode>(
    `/movies/${movieId}/seasons/${seasonId}/episodes/${episodeId}`,
    "DELETE",
    null
  );
export const addLanguage = async ({
  language,
  movieId,
  seasonId,
  episodeId,
}: {
  language: AddLanguageFields;
  movieId: string;
  seasonId: string;
  episodeId: string;
}) =>
  Request<TAddLanguage>(
    `/movies/${movieId}/seasons/${seasonId}/episodes/${episodeId}/languages`,
    "POST",
    {
      ...language,
    }
  );

export const editLanguage = async ({
  language,
  movieId,
  seasonId,
  episodeId,
  languageId,
}: {
  language: AddLanguageFields;
  movieId: string;
  seasonId: string;
  episodeId: string;
  languageId: string;
}) =>
  Request<TEditLanguage>(
    `/movies/${movieId}/seasons/${seasonId}/episodes/${episodeId}/languages/${languageId}`,
    "PATCH",
    {
      ...language,
    }
  );

export const deleteLanguage = async ({
  languageId,
  movieId,
  seasonId,
  episodeId,
}: {
  languageId: string;
  movieId: string;
  seasonId: string;
  episodeId: string;
}) =>
  Request<TDeleteLanguage>(
    `/movies/${movieId}/seasons/${seasonId}/episodes/${episodeId}/languages/${languageId}`,
    "DELETE",
    null
  );

export const addResolution = async ({
  resolution,
  movieId,
  seasonId,
  episodeId,
  languageId,
}: {
  resolution: AddResolutionFields;
  movieId: string;
  seasonId: string;
  episodeId: string;
  languageId: string;
}) =>
  Request<TAddLanguage>(
    `/movies/${movieId}/seasons/${seasonId}/episodes/${episodeId}/languages/${languageId}/resolutions`,
    "POST",
    {
      ...resolution,
    }
  );

export const editResolution = async ({
  resolution,
  movieId,
  seasonId,
  episodeId,
  languageId,
  resolutionId,
}: {
  resolution: AddResolutionFields;
  movieId: string;
  seasonId: string;
  episodeId: string;
  languageId: string;
  resolutionId: string;
}) =>
  Request<TAddLanguage>(
    `/movies/${movieId}/seasons/${seasonId}/episodes/${episodeId}/languages/${languageId}/resolutions/${resolutionId}`,
    "PATCH",
    {
      ...resolution,
    }
  );

export const deleteResolution = async ({
  resolutionId,
  movieId,
  seasonId,
  episodeId,
  languageId,
}: {
  resolutionId: string;
  movieId: string;
  seasonId: string;
  episodeId: string;
  languageId: string;
}) =>
  Request<TDeleteResolution>(
    `/movies/${movieId}/seasons/${seasonId}/episodes/${episodeId}/languages/${languageId}/resolutions/${resolutionId}`,
    "DELETE",
    null
  );
