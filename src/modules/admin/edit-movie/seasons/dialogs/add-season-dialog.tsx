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
import { AddSeasonForm } from "../forms/add-season-form";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const AddSeasonDialog = ({ id }: { id: string }) => {
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
          <Typography variant="h3">სეზონის დამატება</Typography>
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
        <DialogTitle>სეზონის დამატება</DialogTitle>
        <DialogContent>
          <AddSeasonForm onClose={handleClose} id={id} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
