import { Box, Stack, Typography } from "@mui/material";
import { TSeason } from "modules/admin/admin-type";
import { AddSeasonDialog } from "./dialogs/add-season-dialog";
import { AddEpisodeDialog } from "../episodes/dialogs/add-episode-dialog";
import { Episodes } from "../episodes/episodes";
import { EditSeasonDialog } from "./dialogs/edit-season-dialog";
import { DeleteSeasonDialog } from "./dialogs/delete-season-dialog";
export const Seasons = ({
  seasons,
  id,
}: {
  seasons: Array<TSeason>;
  id: string;
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h1">ვიდეო მასალა</Typography>
      <Box mt={2} border="1px dashed red">
        {seasons?.map((season) => (
          <Box key={season.id} px={2} my={2}>
            <Stack direction="row" alignItems="center" gap={4}>
              <Typography variant="h2">{season.title}</Typography>
              <Stack direction="row" alignItems="center" gap={2}>
                <EditSeasonDialog id={id} season={season} />
                <DeleteSeasonDialog
                  movieId={id}
                  seasonId={season.id}
                  title={season.title}
                />
              </Stack>
            </Stack>

            <Episodes
              movieId={id}
              seasonId={season.id}
              episodes={season.episodes}
            />
            <AddEpisodeDialog movieId={id} seasonId={season.id} />
          </Box>
        ))}
        <AddSeasonDialog id={id} />
      </Box>
    </Box>
  );
};
