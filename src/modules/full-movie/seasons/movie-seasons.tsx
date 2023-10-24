import { Box, Button, Stack, Typography } from "@mui/material";
import { TSeason } from "modules/admin/admin-type";
import { MutableRefObject, useState } from "react";
import { EpisodeCard } from "./cards/episode-card";

export const MovieSeasons = ({
  seasons,
  type,
  scrollEpisodesRef,
}: {
  seasons: Array<TSeason>;
  type: string;
  scrollEpisodesRef: MutableRefObject<HTMLElement | null>;
}) => {
  const [currnetSeason, setCurrentSeason] = useState(0);
  return (
    <Box mt={5} ref={scrollEpisodesRef}>
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography variant="h3">
          {type === "ფილმი" ? "ფილმი" : "სეზონები"}:{" "}
        </Typography>
        {type !== "ფილმი" &&
          seasons.map((_, index) => (
            <Button
              variant={currnetSeason === index ? "contained" : "text"}
              key={`seasons-${index}`}
              onClick={() => setCurrentSeason(index)}
            >
              {index + 1}
            </Button>
          ))}
      </Stack>
      <Box mt={2}>
        <Typography variant="h4">
          {type !== "ფილმი" && seasons[currnetSeason].title}
        </Typography>
      </Box>
      <Stack flexWrap="wrap" gap={2} direction="row" mt={4} mb={5}>
        {seasons[currnetSeason].episodes.map((episode, index) => (
          <EpisodeCard key={episode.id} episode={episode} index={index} />
        ))}
      </Stack>
    </Box>
  );
};
