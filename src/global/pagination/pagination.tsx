import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as React from "react";

export const GlobalPagination = ({
  page,
  pages,
  setPage,
}: {
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack alignItems="center" width={1} my={2}>
      <Stack spacing={2}>
        <Pagination count={pages} page={page} onChange={handleChange} />
      </Stack>
    </Stack>
  );
};
