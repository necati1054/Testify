import { useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import StatCards from "./item/StatCards";
import axios from "axios.js";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function AdminDashboard() {
  const { palette } = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "Testify - Yönetici Paneli";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("admin-dashboard").then((res) => {
      console.log(res.data);
      setData(res.data.data);
    });
  };

  return (
    <ContentBox className="analytics">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>Yönetici Paneli</h1>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {data.map((item, index) => (
              <StatCards key={index} name={item.name} value={item.value} icon={item.icon} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
}

export default AdminDashboard;
