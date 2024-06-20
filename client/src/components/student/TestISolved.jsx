import { useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";
import SolvedCards from "./item/SolvedCards";
import { useNavigate } from "react-router-dom";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function TestISolved() {
  const { palette } = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let control = false;

  useEffect(() => {
    if (user.role != 3) navigate(-1);
    document.title = "Testify - Çözmüş Olduğum Testler";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("get-solved-test/" + user.id).then((res) => {
      console.log(res.data);
      setData(res.data.solvedTest);
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
              <h1 style={{ color: palette.primary.main }}>Çözmüş Olduğum Testler</h1>
            </Grid>
            <Grid container spacing={3} sx={{ padding: "24px" }}>
              {data.map((item, index) => (
                <SolvedCards
                  key={index}
                  testName={item.get_test.testName}
                  created_at={item.get_test.created_at}
                  total_point={item.total_point}
                  solved_date={item.solved_date}
                  id={item.id}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
}

export default TestISolved;
