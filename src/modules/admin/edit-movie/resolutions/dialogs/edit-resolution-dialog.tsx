import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ReactElement, Ref, forwardRef, useState } from "react";
import { TResolution } from "modules/admin/admin-type";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { EditResolutioeForm } from "../forms/edit-resolution-form";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const EditResolutionDialog = ({
  movieId,
  seasonId,
  episodeId,
  languageId,
  resolutionId,
  resolution,
}: {
  movieId: string;
  seasonId: string;
  episodeId: string;
  languageId: string;
  resolutionId: string;
  resolution: TResolution;
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
        <DialogTitle>რეზოლუციის რედაქტირება</DialogTitle>
        <DialogContent>
          <EditResolutioeForm
            onClose={handleClose}
            seasonId={seasonId}
            movieId={movieId}
            episodeId={episodeId}
            languageId={languageId}
            resolutionId={resolutionId}
            defaultValues={{
              player: resolution.player,
              resolution: resolution.resolution,
              url: resolution.url,
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
