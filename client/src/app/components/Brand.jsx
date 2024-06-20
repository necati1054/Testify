import React, { useEffect, useState } from "react";
import axios from "axios.js";
import { Box, styled } from "@mui/material";
import { Span } from "./Typography";
import { MatxLogo } from "app/components";
import useSettings from "app/hooks/useSettings";

// STYLED COMPONENTS
const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 18px 20px 29px"
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: ".5rem",
  display: mode === "compact" ? "none" : "block"
}));

export default function Brand({ children }) {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;
  const [icon, setIcon] = useState("");

  const imageUrl = () => {
    if (window.location.hostname == "localhost") return `http://localhost:8000/Image/`;
    return `https://testifybackend.necatiarman.dev/Image/`;
  };

  useEffect(() => {
    getIcon();
  }, []);

  console.log("icon", icon);

  const getIcon = async () => {
    axios.get("/settings").then((res) => {
      res.data.map((item) => {
        if (item.key == "logo") {
          setIcon(item.value);
        }
      });
    });
  };

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        {icon ? <img src={imageUrl() + icon} width="24px" height="24px" /> : <MatxLogo />}
        <StyledSpan mode={mode} className="sidenavHoverShow">
          TESTİFY
        </StyledSpan>
      </Box>

      <Box className="sidenavHoverShow" sx={{ display: mode === "compact" ? "none" : "block" }}>
        {children || null}
      </Box>
    </BrandRoot>
  );
}
