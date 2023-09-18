import { Container } from "@mui/material";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        border: "none",
      }}
    >
      {children}
    </Container>
  );
};
