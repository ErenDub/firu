import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ReactElement, Ref, forwardRef, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { TEpisode } from "modules/admin/admin-type";
import { EditEpisodeForm } from "../forms/edit-episode-form";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const EditEpisodeDialog = ({
  movieId,
  seasonId,
  episode,
}: {
  movieId: string;
  seasonId: string;
  episode: TEpisode;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box width={1}>
      <Button color="primary" onClick={handleClickOpen}>
        <EditRoundedIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>ეპიზოდის რედაქტირება</DialogTitle>
        <DialogContent>
          <EditEpisodeForm
            onClose={handleClose}
            seasonId={seasonId}
            movieId={movieId}
            episodeId={episode.id}
            defaultValues={{
              title: episode.title,
              duration: episode.duration,
              openingStart: episode.openingStart,
              openingEnd: episode.openingEnd,
              poster: episode.poster,
              end: episode.end,
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
