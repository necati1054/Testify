import { useEffect, useState } from "react";
import { Grid, styled, useTheme } from "@mui/material";
import StatCards from "./item/StatCards";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function TeacherDashboard() {
  const { palette } = useTheme();
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Testify - Öğretmen Paneli";
    getData(user);
  }, []);

  const getData = async (user) => {
    await axios.get("teacher-dashboard/" + user.id).then((res) => {
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
              <h1 style={{ color: palette.primary.main }}>Öğretmen Paneli</h1>
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

export default TeacherDashboard;
