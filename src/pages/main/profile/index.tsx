import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { MainLayout } from "global/layouts/mainLayout";

const Profile = () => {
  return (
    <MainLayout>
      <Box mt={15}>
        <Stack
          alignItems="center"
          gap={2}
          borderRadius={2}
          p={2}
          sx={{
            borderBottom: 2,
            borderColor: "secondary.100",
          }}
        >
          <Avatar
            sx={{
              width: 150,
              height: 150,
            }}
            alt="Avatar"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/536f8790-3661-4715-ab7e-87a660eb58f7/devc993-e9c05a04-8808-4663-817c-9c836c0546df.jpg/v1/fill/w_1280,h_1601,q_75,strp/eren_yeager_by_waristeinz_devc993-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMSIsInBhdGgiOiJcL2ZcLzUzNmY4NzkwLTM2NjEtNDcxNS1hYjdlLTg3YTY2MGViNThmN1wvZGV2Yzk5My1lOWMwNWEwNC04ODA4LTQ2NjMtODE3Yy05YzgzNmMwNTQ2ZGYuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.aEMGFcgrzPJ6hHBWdLpAajQD9QGbu5IPPotENwbR3Gg"
          />
          <Box>
            <Typography textAlign="center" variant="h1">
              Eren
            </Typography>
            <Typography textAlign="center" variant="h3">
              foxmr88@gmail.com
            </Typography>
          </Box>
          <Button variant="outlined">რედაქტირება</Button>
        </Stack>
      </Box>
    </MainLayout>
  );
};
export default Profile;
