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
import SolverAnswerCardShow from "./SolverAnswerCardShow";

function SolverQuestionCardShow({ element2 }) {
  // console.log("element2", element2);
  return (
    <CardContent>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item lg={1} md={2} sm={2} xs={2}></Grid>
        <Grid item lg={7} md={7} sm={7} xs={7}>
          <TextField
            value={element2.get_question.text}
            fullWidth
            variant="outlined"
            disabled
            label="Soru"
          />
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <TextField
            value={element2.get_question.point}
            fullWidth
            variant="outlined"
            disabled
            label="Puan"
          />
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
      </Grid>
      {element2.get_question.answers.map((element, index) => (
        <SolverAnswerCardShow
          key={index}
          element={element}
          given_answer_id={element2.given_answer_id}
          type={element2.get_question.type}
        />
      ))}
      {element2.get_question.type == 2 && (
        <>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item lg={1} md={2} sm={2} xs={2}></Grid>
            <Grid item lg={7} md={7} sm={7} xs={7}>
              <TextField
                value={element2.given_answer_text}
                fullWidth
                variant="outlined"
                disabled
                label="Cevap"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}></Grid>
          </Grid>
        </>
      )}
    </CardContent>
  );
}

export default SolverQuestionCardShow;
