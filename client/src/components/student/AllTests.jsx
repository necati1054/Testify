import { useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";
import AllTestsCards from "./item/AllTestsCards";
import { useNavigate } from "react-router-dom";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function AllTests() {
  const { palette } = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let control = false;

  useEffect(() => {
    if (user.role != 3) navigate(-1);
    document.title = "Testify - Bütün Testler";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("all-test").then((res) => {
      setData(res.data);
      control = true;
    });
  };

  if (data.length === 0 && control) {
    return <h1>Yükleniyor Lütfen Bekleyiniz</h1>;
  }
  return (
    <ContentBox className="analytics">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>Bütün Testler</h1>
            </Grid>
            <Grid container spacing={3} sx={{ padding: "24px" }}>
              {data.map((item, index) => (
                <AllTestsCards
                  key={index}
                  id={item.id}
                  testName={item.testName}
                  created_at={item.created_at}
                  totalPoint={item.totalPoint}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
}

export default AllTests;
