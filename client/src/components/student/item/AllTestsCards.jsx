import React from "react";
import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  CardHeader
} from "@mui/material";
import axios from "axios.js";
import { useHistory, useNavigate } from "react-router-dom";

function AllTestsCards({ testName, totalPoint, created_at, id }) {
  const date = new Date(created_at);
  const navigate = useNavigate();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const createdDate = date.toLocaleDateString("tr-TR", options);

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  const navigateToTest = (testName, id) => {
    let slug = slugify(testName);
    navigate(`/test/${slug}/${id}`);
  };

  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={testName} />
        <Divider variant="middle" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Test Oluşturulma Tarihi = {createdDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Toplam Puan = {totalPoint}
          </Typography>
        </CardContent>
        <CardActions sx={{ float: "right" }}>
          <Button size="small" onClick={() => navigateToTest(testName, id)}>
            çöz
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default AllTestsCards;
