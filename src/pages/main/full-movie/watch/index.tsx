import { Box } from "@mui/material";
import { FiruPlayer } from "global/player/firu-player";
import { getEpisode } from "modules/home/home-fetch";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const WatchEpisode = () => {
  const { movieId, episodeId } = useParams();
  const $episode = useQuery(`episode-${movieId}-${episodeId}`, () =>
    getEpisode({ movieId: movieId ?? "", episodeId: episodeId ?? "" })
  );
  return (
    <Box>
      {$episode.data && (
        <FiruPlayer episode={$episode.data} movieId={movieId ?? ""} />
      )}
    </Box>
  );
};

export default WatchEpisode;
