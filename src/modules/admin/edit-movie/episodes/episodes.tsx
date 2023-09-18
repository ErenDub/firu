import { Box, Stack, Typography } from "@mui/material";
import { TEpisode } from "modules/admin/admin-type";
import { AddLanguageDialog } from "../languages/dialogs/add-language-dialog";
import { Langauges } from "../languages/languages";
import { DeleteEpisodeDialog } from "./dialogs/delete-episode-dialog";
import { EditEpisodeDialog } from "./dialogs/edit-episode-dialog";
export const Episodes = ({
  movieId,
  seasonId,
  episodes,
}: {
  movieId: string;
  seasonId: string;
  episodes: Array<TEpisode>;
}) => {
  return (
    <Box border="1px dashed green">
      {episodes?.map((episode) => (
        <Box key={episode.id} px={2} my={2}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Typography variant="h2">{episode.title}</Typography>
            <Stack direction="row" alignItems="center" gap={2}>
              <EditEpisodeDialog
                movieId={movieId}
                seasonId={seasonId}
                episode={episode}
              />
              <DeleteEpisodeDialog
                movieId={movieId}
                seasonId={seasonId}
                episodeId={episode.id}
                title={episode.title}
              />
            </Stack>
          </Stack>
          <Langauges
            seasonId={seasonId}
            movieId={movieId}
            episodeId={episode.id}
            languages={episode.languages}
          />
          <AddLanguageDialog
            movieId={movieId}
            seasonId={seasonId}
            episodeId={episode.id}
          />
        </Box>
      ))}
    </Box>
  );
};
