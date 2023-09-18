import { Request } from "lib/request";
import { TgetMovies } from "modules/admin/admin-type";

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
    null
  );
