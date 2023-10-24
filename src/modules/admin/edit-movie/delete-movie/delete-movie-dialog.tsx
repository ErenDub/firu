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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteMovie } from "modules/admin/admin-fetch";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const DeleteMovieDialog = ({
  movieId,
  title,
}: {
  movieId: string;
  title: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const $deleteSeason = useMutation(deleteMovie);
  const onSubmit = () => {
    $deleteSeason.mutate(
      { movieId },
      {
        onSuccess: (movieId) => {
          handleClose();
          navigate("/admin/movies");
        },
      }
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box width={1}>
      <Button
        color="error"
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<DeleteOutlineOutlinedIcon />}
        fullWidth
      >
        ფილმის წაშლა
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>ფილმის წაშლა</DialogTitle>
        <DialogContent>
          <Typography>დანამდვილებით გსურთ "{title}" წაშლა?</Typography>
          <Stack mt={2} direction={{ md: "row", xs: "column" }} gap={2}>
            <Button
              fullWidth
              disabled={$deleteSeason.isLoading}
              color="error"
              variant="outlined"
              onClick={onSubmit}
            >
              წაშლა
            </Button>
            <Button fullWidth onClick={handleClose}>
              გაუქმება
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
