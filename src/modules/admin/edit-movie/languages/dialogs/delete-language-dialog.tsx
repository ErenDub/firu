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
import { deleteLanguage } from "modules/admin/admin-fetch";
import { useMutation, useQueryClient } from "react-query";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const DeleteLanguageDialog = ({
  movieId,
  seasonId,
  episodeId,
  languageId,
  language,
}: {
  movieId: string;
  seasonId: string;
  episodeId: string;
  languageId: string;
  language: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const queryClient = useQueryClient();

  const $deleteSeason = useMutation(deleteLanguage);
  const onSubmit = () => {
    $deleteSeason.mutate(
      { movieId, seasonId, episodeId, languageId },
      {
        onSuccess: (movieId) => {
          queryClient.invalidateQueries({ active: true });
          handleClose();
        },
      }
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box width={1}>
      <Button color="error" variant="outlined" onClick={handleClickOpen}>
        <DeleteOutlineOutlinedIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>ენის წაშლა</DialogTitle>
        <DialogContent>
          <Typography>დანამდვილებით გსურთ "{language}" წაშლა?</Typography>
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