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
import { useNavigate } from "react-router-dom";

function SolvedCards({ testName, total_point, solved_date, created_at, id }) {
  const date = new Date(created_at);
  const date2 = new Date(solved_date);
  const navigate = useNavigate();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const createdDate = date.toLocaleDateString("tr-TR", options);
  const solvedDate = date2.toLocaleDateString("tr-TR", options);

  const handleClick = (id) => {
    navigate("/testısolvedshow/" + id);
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
            Test Çözülme Tarihi = {solvedDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Puan = {total_point}
          </Typography>
        </CardContent>
        <CardActions sx={{ float: "right" }}>
          <Button size="small" onClick={() => handleClick(id)}>
            Gözden Geçir
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default SolvedCards;
