import { Box, Button, Stack, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../../../global/images/firu-logo-lg.png";

export const NoAccess = () => {
  const navigate = useNavigate();
  return (
    <Stack
      mt={5}
      alignItems="center"
      width={1}
      justifyContent="center"
      height="90vh"
    >
      <Stack
        justifyContent="center"
        width={1}
        alignItems="center"
        spacing={2}
        sx={{
          maxWidth: { lg: "500px", xs: "300px" },
          borderRadius: 1,
          p: "20px 20px 50px 20px",
        }}
      >
        <Box component="img" src={logo} width={180} mb={4} />
        <Alert
          severity="error"
          sx={{
            width: { lg: "500px", xs: "300px" },
            border: 0,
          }}
        >
          <AlertTitle>403 - თქვენ არ გაქვთ წვდომა!</AlertTitle>
          თქვენ არ გაქვთ წვდომა გვერდზე რომელსაც ეძებთ.
        </Alert>
        <Button color="error" variant="outlined" onClick={() => navigate("/")}>
          მთავარი
        </Button>
      </Stack>
    </Stack>
  );
};
