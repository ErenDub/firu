import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ReactElement, Ref, forwardRef, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { AddResolutioeForm } from "../forms/add-resolution-form";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const AddResolutionDialog = ({
  movieId,
  seasonId,
  episodeId,
  languageId,
}: {
  movieId: string;
  seasonId: string;
  episodeId: string;
  languageId: string;
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
      <Button
        variant="text"
        sx={{
          bgcolor: "secondary.100",
          borderRadius: 1,
          p: 3,
          justifyContent: "space-between",
          alignItems: "center",
          maxHeight: "none",
          height: "auto",
          width: 1,
        }}
        fullWidth
        onClick={handleClickOpen}
      >
        <Stack gap={1} justifyContent="start" alignItems="start">
          <Typography variant="h3">რეზოლუციის დამატება</Typography>
        </Stack>
        <AddRoundedIcon
          sx={{
            color: "text.primary",
          }}
        />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>რეზოლუციის დამატება</DialogTitle>
        <DialogContent>
          <AddResolutioeForm
            onClose={handleClose}
            seasonId={seasonId}
            movieId={movieId}
            episodeId={episodeId}
            languageId={languageId}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
