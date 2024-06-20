import { useEffect, useState } from "react";
import { Button, Card, Grid, IconButton, styled, useTheme } from "@mui/material";
import axios from "axios.js";
import TestCards from "./item/TestCards";
import useAuth from "app/hooks/useAuth";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

const BottomRight = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "100%",
  top: "90%",
  marginLeft: "-100px"
}));

function TestICreated() {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  let control = false;

  useEffect(() => {
    if (user.role != 2) navigate(-1);
    document.title = "Testify - Oluşturduğum Testler";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("my-tests/" + user.id).then((res) => {
      console.log(res.data);
      setData(res.data.tests);
      control = true;
    });
  };

  const gotoCreateTest = () => {
    navigate("/testıcreated/createtest");
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
              <h1 style={{ color: palette.primary.main }}>Oluşturduğum Testler</h1>
            </Grid>
            <Grid container spacing={3} sx={{ padding: "24px" }}>
              {data.map((item, index) => (
                <TestCards
                  key={index}
                  testName={item.testName}
                  created_at={item.created_at}
                  id={item.id}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BottomRight>
        <IconButton
          aria-label="fingerprint"
          color="primary"
          sx={{ bgcolor: "ActiveCaption" }}
          onClick={() => gotoCreateTest()}
        >
          <AddIcon />
        </IconButton>
      </BottomRight>
    </ContentBox>
  );
}

export default TestICreated;
