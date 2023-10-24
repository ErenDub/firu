import { Box, Stack, Typography } from "@mui/material";
import { TEpisode } from "modules/admin/admin-type";
import { AddLanguageDialog } from "../languages/dialogs/add-language-dialog";
import { Langauges } from "../languages/languages";
import { DeleteEpisodeDialog } from "./dialogs/delete-episode-dialog";
import { EditEpisodeDialog } from "./dialogs/edit-episode-dialog";
export const Episodes = ({ episodes }: { episodes: Array<TEpisode> }) => {
  return (
    <Box border="1px dashed green">
      {episodes?.map((episode) => (
        <Box key={episode.id} px={2} my={2}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Typography variant="h2">{episode.title}</Typography>
            <Stack direction="row" alignItems="center" gap={2}>
              <EditEpisodeDialog episode={episode} />
              <DeleteEpisodeDialog
                episodeId={episode.id}
                title={episode.title}
              />
            </Stack>
          </Stack>
          <Langauges languages={episode.languages} />
          <AddLanguageDialog episodeId={episode.id} />
        </Box>
      ))}
    </Box>
  );
};
