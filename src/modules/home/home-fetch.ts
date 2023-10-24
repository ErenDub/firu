import { Request } from "lib/request";
import { TgetMovies, TgetTopMovies } from "modules/admin/admin-type";
import { TGetEpisode } from "./home-type";

export const getSearch = async ({
  page,
  search,
  type,
}: {
  page: number;
  search: string;
  type: string;
}) =>
  Request<TgetMovies>(
    `/movies?page=${page}&title=${search}&type=${type}`,
    "GET",
    null,
    false
  );

export const getTopWeek = async ({ limit }: { limit: number }) =>
  Request<TgetTopMovies>(`/movies/top?limit=${limit}`, "GET", null, false);

export const getLatest = async ({
  limit,
  type,
}: {
  limit: number;
  type: string;
}) =>
  Request<TgetMovies>(
    `/movies?limit=${limit}&type=${type}`,
    "GET",
    null,
    false
  );

export const getEpisode = async ({
  movieId,
  episodeId,
}: {
  movieId: string;
  episodeId: string;
}) =>
  Request<TGetEpisode>(
    `/movies/${movieId}/episodes/${episodeId}`,
    "GET",
    null,
    false
  );
