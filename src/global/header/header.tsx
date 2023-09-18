import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MouseEvent, useState } from "react";
import TheatersRoundedIcon from "@mui/icons-material/TheatersRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import { useNavigate } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import logo from "../images/firu-logo-lg.png";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useAuthContext } from "lib/providers/login-provider/context/authContext";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
const drawerWidth = 260;

const pages = [
  {
    title: "მთავარი",
    path: "/",
    icon: <HomeRoundedIcon />,
  },
  {
    title: "ფილმები",
    path: "/movies",
    icon: <TheatersRoundedIcon />,
  },
  {
    title: "სერიალები",
    path: "/tv-shows",
    icon: <LiveTvRoundedIcon />,
  },
  {
    title: "ანიმე",
    path: "/animes",
    icon: <PaletteRoundedIcon />,
  },
];
const settings = [
  {
    title: "პროფილი",
    path: "/profile",
  },
  {
    title: "პროფილის რედაქტირება",
    path: "/profile/edit",
  },
];
export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { checkAuth } = useAuthContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <div>
      <Toolbar />

      <List>
        <ListItem disablePadding onClick={() => navigate("/login")}>
          <ListItemButton>
            <ListItemIcon>
              <PersonRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="ავტორიზაცია" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate("/register")}>
          <ListItemButton>
            <ListItemIcon>
              <PersonAddAltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="რეგისტრაცია" />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => navigate("/search")}
          sx={{
            bgcolor:
              `/search` === window.location.pathname
                ? "secondary.100"
                : "transparent",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <SearchRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="ძებნა" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem
            disablePadding
            onClick={() => navigate(page.path)}
            key={page.path}
            sx={{
              bgcolor:
                `${page.path}` === window.location.pathname
                  ? "secondary.100"
                  : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <AppBar
      position="fixed"
      sx={{
        border: "none",
        background:
          " linear-gradient(180deg, #0E1012 0%, rgba(14, 16, 18, 0.00) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logo}
            height={30}
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex", md: "flex" },
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Stack
            width={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              mr: checkAuth ? 0 : 2,
              display: { xs: "flex", sm: "none", md: "none" },
            }}
          >
            <Box component="img" src={logo} height={30} />
          </Stack>

          <Box
            sx={{ flexGrow: 1, gap: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <Button
                key={page.path}
                variant="text"
                onClick={() => navigate(page.path)}
                sx={{
                  my: 2,
                  color:
                    window.location.pathname === page.path
                      ? "primary.light"
                      : "text.primary",
                }}
                startIcon={page.icon}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Stack gap={2} direction="row" sx={{ flexGrow: 0 }}>
            <Button
              variant="text"
              color="secondary"
              startIcon={<SearchRoundedIcon />}
              onClick={() => navigate("/search")}
              sx={{
                my: 2,
                display: { md: "flex", xs: "none" },
                color:
                  window.location.pathname === "/search"
                    ? "primary.light"
                    : "text.primary",
              }}
            >
              ძებნა
            </Button>
            {checkAuth ? (
              <Tooltip title="პარამეტრები">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Stack
                direction="row"
                gap={2}
                alignItems="center"
                sx={{
                  display: { md: "flex", xs: "none" },
                }}
              >
                <Button
                  color="secondary"
                  startIcon={<PersonRoundedIcon />}
                  onClick={() => navigate("/login")}
                >
                  ავტორიზაცია
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<PersonAddAltRoundedIcon />}
                  onClick={() => navigate("/registration")}
                >
                  რეგისტრაცია
                </Button>
              </Stack>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.path}
                  onClick={() => navigate(setting.path)}
                  sx={{
                    bgcolor:
                      `${setting.path}` === window.location.pathname
                        ? "secondary.100"
                        : "transparent",
                  }}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" color="error">
                  გასვლა
                </Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
