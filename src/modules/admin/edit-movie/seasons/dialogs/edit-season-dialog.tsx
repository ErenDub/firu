import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ReactElement, Ref, forwardRef, useState } from "react";
import { TSeason } from "modules/admin/admin-type";
import { EditSeasonForm } from "../forms/edit-season-form";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const EditSeasonDialog = ({
  id,
  season,
}: {
  id: string;
  season: TSeason;
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
        <DialogTitle>სეზონის რედაქტირება</DialogTitle>
        <DialogContent>
          <EditSeasonForm
            onClose={handleClose}
            id={id}
            defaultValues={{ title: season.title }}
            seasonId={season.id}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
