import { Container, Paper } from "@mui/material";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      component={Paper}
      maxWidth="xl"
      sx={{
        my: 3,
        py: 3,
        border: "none",
      }}
    >
      {children}
    </Container>
  );
};
