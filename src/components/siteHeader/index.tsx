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

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [submenuEl, setSubmenuEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    {
      label: "Favorites",
      submenu: [
        { label: "Favorite Movies", path: "/movies/favourites" },
        { label: "Favorite TV Shows", path: "/tvshows/favourites" },
        { label: "Favorite Actors", path: "/actors/favourites" },
      ],
    },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Top Movies", path: "/movies/top" },
    { label: "Popular Movies", path: "/movies/popular" },
    { label: "Popular Actors", path: "/actors/popular" },
    { label: "Discover TV Shows", path: "/tvshows/discover" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorEl(null);
    setSubmenuEl(null);
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmenu = (event: MouseEvent<HTMLElement>) => {
    setSubmenuEl(event.currentTarget);
  };

  const closeMenus = () => {
    setAnchorEl(null);
    setSubmenuEl(null);
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
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={closeMenus}
              >
                {menuOptions.map((opt) => (
                  opt.submenu ? (
                    <div key={opt.label}>
                      <MenuItem onClick={handleSubmenu}>
                        {opt.label}
                      </MenuItem>
                      <Menu
                        anchorEl={submenuEl}
                        open={Boolean(submenuEl)}
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
                      onClick={handleSubmenu}
                    >
                      {opt.label}
                    </Button>
                    <Menu
                      anchorEl={submenuEl}
                      open={Boolean(submenuEl)}
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
