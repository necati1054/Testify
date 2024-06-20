import React, { useRef } from "react";
import {
  Grid,
  TextField,
  IconButton,
  CardContent,
  Card,
  InputAdornment,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ImageIcon from "@mui/icons-material/Image";
import AnswerCardShow from "./AnswerCardShow";

function QuestionCardShow({ element2, index }) {
  // console.log("element2", element2);

  const imageUrl = (url) => {
    if (window.location.hostname == "localhost") return `http://localhost:8000/Image/` + url;
    return `https://testifybackend.necatiarman.dev/Image/` + url;
  };

  return (
    <CardContent sx={{ textAlign: "center" }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item lg={12} md={7} sm={7} xs={7}>
          <h2>
            {index + 1}) {element2.get_question.text} {`(${element2.get_question.point} Puan)`}
          </h2>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {element2.get_question.image_path && (
            <img
              src={imageUrl(element2.get_question.image_path)}
              alt="question"
              width="100%"
              height="300"
              style={{
                margin: "auto",
                objectFit: "contain"
              }}
            />
          )}
        </Grid>
        <br />
        <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {element2.get_question.answers.map((element, index) => (
          <AnswerCardShow
            key={index}
            element={element}
            given_answer_id={element2.given_answer_id}
            type={element2.get_question.type}
          />
        ))}
      </Grid>
      {element2.get_question.type == 2 && (
        <>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item lg={1} md={2} sm={2} xs={2}></Grid>
            <Grid item lg={1} md={2} sm={2} xs={2}></Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <TextField
                value={element2.given_answer_text}
                fullWidth
                variant="outlined"
                disabled
                label="Cevap"
                multiline
              />
            </Grid>
            <Grid item lg={2} md={4} sm={4} xs={4}></Grid>
          </Grid>
        </>
      )}
    </CardContent>
  );
}

export default QuestionCardShow;
