import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ReactElement, Ref, forwardRef, useState } from "react";
import { EditLanguageForm } from "../forms/edit-language-form";
import { TLanguage } from "modules/admin/admin-type";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const EditLanguageDialog = ({ language }: { language: TLanguage }) => {
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
        <DialogTitle>ენის რედაქტირება</DialogTitle>
        <DialogContent>
          <EditLanguageForm
            onClose={handleClose}
            languageId={language.id}
            defaultValues={{
              language: language.language,
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
