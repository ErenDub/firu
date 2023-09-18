import { Box, Stack, Typography } from "@mui/material";
import { TResolution } from "modules/admin/admin-type";
import { DeleteResolutionDialog } from "./dialogs/delete-resolution-dialog";
import { EditResolutionDialog } from "./dialogs/edit-resolution-dialog";

export const Resolutions = ({
  seasonId,
  movieId,
  episodeId,
  languageId,
  resolutions,
}: {
  seasonId: string;
  movieId: string;
  episodeId: string;
  languageId: string;
  resolutions: Array<TResolution>;
}) => {
  return (
    <Box border="1px dashed yellow">
      {resolutions.map((resolution) => (
        <Box key={resolution.id} px={2} my={2}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Typography variant="h3">{resolution.resolution}</Typography>
            <Stack direction="row" alignItems="center" gap={2}>
              <EditResolutionDialog
                episodeId={episodeId}
                languageId={languageId}
                movieId={movieId}
                resolution={resolution}
                resolutionId={resolution.id}
                seasonId={seasonId}
              />
              <DeleteResolutionDialog
                episodeId={episodeId}
                languageId={languageId}
                movieId={movieId}
                resolution={resolution.resolution}
                resolutionId={resolution.id}
                seasonId={seasonId}
              />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};
