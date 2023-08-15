import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

const ErrorPage = ({ information }: { information: string | null }) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack alignItems="center" mt={5} width={1}>
        <Stack
          justifyContent="center"
          width={1}
          alignItems="center"
          spacing={2}
          sx={{
            background: "white",
            width: { lg: "500px", md: "500px", sm: "300px", xs: "300px" },

            borderRadius: 1,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            p: 2,
          }}
        >
          <Typography variant="h1">Error</Typography>
          <Button onClick={() => navigate("/")} variant="outlined">
            Main
          </Button>
          <Box mt={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <Typography>Eror</Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{information}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
export default ErrorPage;
