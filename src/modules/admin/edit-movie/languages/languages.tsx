import { Box, Stack, Typography } from "@mui/material";
import { TLanguage } from "modules/admin/admin-type";
import { AddResolutionDialog } from "../resolutions/dialogs/add-resolution-dialog";
import { Resolutions } from "../resolutions/resolutions";
import { DeleteLanguageDialog } from "./dialogs/delete-language-dialog";
import { EditLanguageDialog } from "./dialogs/edit-language-dialog";

export const Langauges = ({ languages }: { languages: Array<TLanguage> }) => {
  return (
    <Box border="1px dashed blue">
      {languages?.map((language) => (
        <Box key={language.id} my={2} px={2}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Typography variant="h3">{language.language}</Typography>
            <Stack direction="row" alignItems="center" gap={2}>
              <EditLanguageDialog language={language} />
              <DeleteLanguageDialog
                language={language.language}
                languageId={language.id}
              />
            </Stack>
          </Stack>
          <Resolutions resolutions={language.resolutions} />
          <AddResolutionDialog languageId={language.id} />
        </Box>
      ))}
    </Box>
  );
};
