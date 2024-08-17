import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import CakeIcon from '@mui/icons-material/Cake';

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [mainMenuAnchorEl, setMainMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { session, user, signOut } = useAuth();

  const menuOptions = [
    { label: "Home", path: "/" },
    {
      label: "Movies",
      submenu: [
        { label: "Upcoming Movies", path: "/movies/upcoming" },
        { label: "Top Movies", path: "/movies/top" },
        { label: "Popular Movies", path: "/movies/popular" },
      ],
    },
    {
      label: "TV Shows",
      submenu: [
        { label: "Discover TV Shows", path: "/tvshows/discover" },
      ],
    },
    {
      label: "Actors",
      submenu: [
        { label: "Popular Actors", path: "/actors/popular" },
      ],
    },
    {
      label: "Favorites",
      submenu: [
        { label: "Favorite Movies", path: "/movies/favourites" },
        { label: "Favorite TV Shows", path: "/tvshows/favourites" },
        { label: "Favorite Actors", path: "/actors/favourites" },
      ],
    },
  ];

  const handleMainMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMainMenuAnchorEl(event.currentTarget);
  };

  const handleSubMenuOpen = (event: MouseEvent<HTMLElement>, label: string) => {
    setSubMenuAnchorEl({ ...subMenuAnchorEl, [label]: event.currentTarget });
  };

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    closeMenus();
  };

  const closeMenus = () => {
    setMainMenuAnchorEl(null);
    setSubMenuAnchorEl({});
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary" sx={{ bgcolor: "maroon" }}>
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            Graflix
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            The Entertainment Hub
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate("/onthisday")}
          >
            <CakeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => navigate("/search")}
          >
            <SearchIcon />
          </IconButton>
          

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 2,
              backgroundColor: 'orange',
              padding: 1,
              borderRadius: 1,
            }}
          >
            {session ? (
              <>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  {user?.email}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Box>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMainMenuOpen}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={mainMenuAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(mainMenuAnchorEl)}
                onClose={closeMenus}
              >
                {menuOptions.map((opt) => (
                  opt.submenu ? (
                    <div key={opt.label}>
                      <MenuItem onClick={(event) => handleSubMenuOpen(event, opt.label)}>
                        {opt.label}
                      </MenuItem>
                      <Menu
                        anchorEl={subMenuAnchorEl[opt.label]}
                        open={Boolean(subMenuAnchorEl[opt.label])}
                        onClose={closeMenus}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        {opt.submenu.map((subOpt) => (
                          <MenuItem
                            key={subOpt.label}
                            onClick={() => handleMenuSelect(subOpt.path)}
                          >
                            {subOpt.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  ) : (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  )
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                opt.submenu ? (
                  <div key={opt.label}>
                    <Button
                      color="inherit"
                      onClick={(event) => handleSubMenuOpen(event, opt.label)}
                    >
                      {opt.label}
                    </Button>
                    <Menu
                      anchorEl={subMenuAnchorEl[opt.label]}
                      open={Boolean(subMenuAnchorEl[opt.label])}
                      onClose={closeMenus}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {opt.submenu.map((subOpt) => (
                        <MenuItem
                          key={subOpt.label}
                          onClick={() => handleMenuSelect(subOpt.path)}
                        >
                          {subOpt.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                ) : (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                )
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
