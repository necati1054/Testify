import React, { useRef } from "react";
import {
  Grid,
  TextField,
  IconButton,
  CardContent,
  Card,
  InputAdornment,
  Button,
  Tooltip,
  tooltipClasses,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HideImageIcon from "@mui/icons-material/HideImage";
import AnswerCards from "./AnswerCards";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";

import { Controller, useForm, useFieldArray } from "react-hook-form";
import axios from "axios.js";
import { toast } from "react-toastify";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14
  }
});

function QuestionCards({ index2, control2, erros, type, questionDelete, getValues2, setValue2 }) {
  const { fields, append, remove } = useFieldArray({
    control: control2,
    name: `question.${index2}.answers`
  });

  const addAnswer = () => {
    append({ text: "", correctAnswer: false, image_path: "" });
  };

  const answerDelete = async (index) => {
    let id = getValues2(`question.${index2}.answers.[${index}].id`);
    console.log(id);
    if (id === undefined) {
      remove(index);
      return;
    }
    await axios
      .delete("delete-answer/" + id)
      .then((res) => {
        console.log(res.data);
        toast.success("Yanıt Başarıyla Silindi!");
        remove(index);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Yanıt Silinemedi!");
      });
  };

  const get_id = (index2) => {
    return getValues2(`question.[${index2}].id`);
  };

  const get_image_path = (index2) => {
    return getValues2(`question.[${index2}].image_path`);
  };

  const image_upload = (index2, e) => {
    let id = get_id(index2);
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("question_id", id);
    axios
      .post("upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        console.log(res.data);
        toast.success(
          "Resim Başarılı Bir şekilde Kaydedildi! Sayfayı Yenileyince Resimler Değişecektir"
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Resim Yükleme Başarısız!");
      });
  };

  const image_delete = (index2) => {
    let id = get_id(index2);

    const formData = new FormData();
    formData.append("question_id", id);
    axios
      .post("delete-image", formData)
      .then((res) => {
        console.log(res.data);
        toast.success(
          "Resim Başarılı Bir şekilde Silindi! Sayfayı Yenileyince Resimler Değişecektir"
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Resim Yüklenirken Hata Oluştu!");
      });
  };

  const imageUrlEditing = () => {
    if (window.location.hostname == "localhost")
      return `http://localhost:3000/Image/image-editing.png`;
    return `https://testifybackend.necatiarman.dev/Image/image-editing.png/`;
  };

  const imageUrlRemove = () => {
    if (window.location.hostname == "localhost")
      return `http://localhost:3000/Image/remove-image-photo-icon.svg`;
    return `https://testifybackend.necatiarman.dev/Image/remove-image-photo-icon.svg/`;
  };

  const imageUrl = (url) => {
    if (window.location.hostname == "localhost") return `http://localhost:8000/Image/` + url;
    return `https://testifybackend.necatiarman.dev/Image/` + url;
  };

  return (
    <CardContent>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item lg={1} md={2} sm={2} xs={2}></Grid>
        <Grid item lg={7} md={7} sm={7} xs={7}>
          <Controller
            name={`question.${index2}.text`}
            control={control2}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Soru - " + (index2 + 1)}
                fullWidth
                rows={2}
                multiline
                variant="outlined"
                error={erros.question && erros.question[index2]?.text ? true : false}
                helperText={
                  erros.question && erros.question[index2]
                    ? erros.question[index2]?.text?.message
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {get_id(index2) != undefined ? (
                        <>
                          <CustomTooltip
                            title={get_image_path(index2) == null ? "Resim Ekle" : "Resim Güncelle"}
                            placement="top"
                          >
                            <Button
                              component="label"
                              startIcon={
                                get_image_path(index2) == null ? (
                                  <ImageIcon />
                                ) : (
                                  <img src={imageUrlEditing()} width="25px" height="25px" />
                                )
                              }
                              sx={{ paddingLeft: 3 }}
                            >
                              <input
                                type="file"
                                hidden
                                onChange={(e) => onChange(image_upload(index2, e))}
                              />
                            </Button>
                          </CustomTooltip>
                          {get_image_path(index2) != null && (
                            <CustomTooltip title="Resmi Sil" placement="top">
                              <IconButton
                                aria-label="delete"
                                color="error"
                                onClick={() => image_delete(index2)}
                              >
                                <img src={imageUrlRemove()} width="25px" height="25px" />
                              </IconButton>
                            </CustomTooltip>
                          )}
                        </>
                      ) : (
                        get_id(index2) == undefined && (
                          <CustomTooltip
                            title="Resim eklenebilmesi için lütfen ilk önce testi kaydediniz"
                            placement="top"
                          >
                            <IconButton aria-label="info" color="inherit">
                              <HideImageIcon />
                            </IconButton>
                          </CustomTooltip>
                        )
                      )}
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      {get_image_path(index2) != null && get_id(index2) != undefined && (
                        <img
                          src={imageUrl(get_image_path(index2))}
                          width="20px"
                          height="20px"
                          onClick={() => {
                            window.open(imageUrl(get_image_path(index2)), "_blank");
                          }}
                          style={{
                            margin: "0px",
                            padding: "0px",
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                            marginLeft: "10px",
                            marginTop: "5px",
                            marginBottom: "5px",
                            marginRight: "5px",
                            display: "inline-block",
                            verticalAlign: "middle",
                            objectFit: "cover",
                            objectPosition: "center",
                            backgroundColor: "#fff",
                            boxShadow: "0 0 5px 0 rgba(0,0,0,.1)",
                            transition: "box-shadow .3s",
                            cursor: "pointer"
                          }}
                        />
                      )}
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <Controller
            name={`question.${index2}.point`}
            control={control2}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                typeo="number"
                min="0"
                label={"Puan - " + (index2 + 1)}
                fullWidth
                variant="outlined"
                error={erros.question && erros.question[index2]?.point ? true : false}
                helperText={
                  erros.question && erros.question[index2]
                    ? erros.question[index2].point?.message
                    : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2} sx={{ alignItems: "center", display: "flex" }}>
          <IconButton aria-label="delete" color="error" onClick={() => questionDelete(index2)}>
            <DeleteIcon />
          </IconButton>
          {type != 2 && (
            <IconButton aria-label="delete" color="success" onClick={() => addAnswer()}>
              <AddIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      {fields.map((item, index) => (
        <AnswerCards
          disabledAnswer={item.deleted_at == null ? false : true}
          key={index}
          index={index}
          index2={index2}
          id={item.id}
          control2={control2}
          erros={erros}
          type={type}
          getValues2={getValues2}
          setValue2={setValue2}
          answerDelete={answerDelete}
        />
      ))}
    </CardContent>
  );
}

export default QuestionCards;
