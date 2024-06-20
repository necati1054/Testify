import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  Drawer,
  IconButton,
  Divider,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  List
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios.js";
import mobilCss from "./MobilCss.module.css";
import MenuIcon from "@mui/icons-material/Menu";

const mainColor = "#d97227";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: mainColor,
  color: "white",
  border: `2px solid ${theme.palette.augmentColor({ color: { main: mainColor } }).dark}`,
  borderRadius: "10px 0px 10px 0px",
  fontSize: "16px",
  transition: "background-color 0.3s, border-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.augmentColor({ color: { main: mainColor } }).dark,
    borderColor: theme.palette.augmentColor({ color: { main: mainColor } }).dark
  }
}));

const Header = () => {
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoRegister = () => {
    navigate("/register");
  };

  const imageUrl = () => {
    if (window.location.hostname === "localhost") return `http://localhost:8000/Image/`;
    return `https://testifybackend.necatiarman.dev/Image/`;
  };

  useEffect(() => {
    getIcon();
    document.body.style.backgroundColor = "#d9d9d8";
  }, []);

  const getIcon = async () => {
    axios.get("/settings").then((res) => {
      res.data.forEach((item) => {
        if (item.key === "logo") {
          setIcon(item.value);
        }
      });
    });
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <a>
              <ListItemText primary="Ana Sayfa" />
            </a>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <a href="#faq">
              <ListItemText primary="Hakkımızda" />
            </a>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <a href="#iletisim">
              <ListItemText primary="İletişim" />
            </a>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={gotoLogin}>
            <ListItemText primary="Giriş Yap" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={gotoRegister}>
            <ListItemText primary="Kayıt Ol" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Container fixed style={{ padding: "0px" }}>
      <Grid container spacing={2} style={{ backgroundColor: "#d8b69e", borderRadius: "10px" }}>
        <Grid
          item
          lg={2}
          md={2}
          sm={2}
          xs={2}
          className="navbar"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={imageUrl() + icon} width="50px" height="50px" className={mobilCss.image} />
          <h1 style={{ marginLeft: "10px", color: "#d97227" }}>TESTİFY</h1>
        </Grid>
        <Grid
          item
          lg={8}
          md={8}
          sm={8}
          xs={8}
          className={mobilCss.headerTam}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            variant="text"
            color="primary"
            style={{ color: "white", fontSize: "16px", marginRight: "10px", fontWeight: "bold" }}
          >
            <a href="#home">Ana Sayfa</a>
          </Button>
          <Button
            variant="text"
            color="primary"
            style={{ color: "white", fontSize: "16px", marginRight: "10px", fontWeight: "bold" }}
          >
            <a href="#faq">S.S.S.</a>
          </Button>
          <Button
            variant="text"
            color="primary"
            style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
          >
            <a href="#iletisim">İletişim</a>
          </Button>
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={2}
          xs={2}
          className={mobilCss.headerTam}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "0px",
            paddingRight: "10px"
          }}
        >
          <CustomButton variant="outlined" color="primary" onClick={gotoLogin}>
            giriş yap
          </CustomButton>
          <CustomButton variant="outlined" color="primary" onClick={gotoRegister}>
            kayıt Ol
          </CustomButton>
        </Grid>
        <Grid
          item
          lg={10}
          md={10}
          sm={10}
          xs={10}
          className={mobilCss.headerMobil}
          sx={{
            float: "right",
            display: "none",
            alignItems: "center",
            justifyContent: "right"
          }}
        >
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Container>
  );
};

export default Header;
