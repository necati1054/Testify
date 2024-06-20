import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";

import { useNavigate, useParams } from "react-router-dom";

const options = { year: "numeric", month: "long", day: "numeric" };

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function TestSolve() {
  const { palette } = useTheme();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [questionDtata, setQuestionData] = useState([]);
  const { user } = useAuth();
  const [myAnswers, setMyAnswers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user.role != 3) navigate(-1);
    document.title = "Testify - Test Çöz";
    getData();
    setLoading(true);
  }, []);

  useEffect(() => {
    if (questionDtata.length > 0) {
      delay1s();
    }
  }, [questionDtata]);

  const getData = async () => {
    await axios.get("bring-the-test/" + id).then((res) => {
      setData(res.data);
      setQuestionData(res.data.get_questions);
    });
  };

  const delay1s = () => {
    setTimeout(() => {
      defaultMyAnswers();
    }, 1000);
  };

  const defaultMyAnswers = () => {
    let answers = [];
    console.log("questionDtata", questionDtata);
    questionDtata.map((item) => {
      if (item.type === 1) {
        answers.push({
          questionId: item.id,
          answerId: null
        });
      } else if (item.type === 2) {
        answers.push({
          questionId: item.id,
          answer_text: ""
        });
      } else {
        answers.push({
          questionId: item.id,
          answerId: []
        });
      }
    });
    console.log(answers);
    setMyAnswers(answers);
    setLoading(false);
  };

  const newDates = (a) => {
    let date = new Date(a);
    const createdDate = date.toLocaleDateString("tr-TR", options);
    return createdDate;
  };

  function formatInput(myAnswers, userId, testId) {
    return {
      question: myAnswers,
      user_id: userId,
      test_id: testId
    };
  }

  const handleOpenChange = () => {
    setOpen(!open);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formatInput(myAnswers, user.id, id));

    Swal.fire({
      title: "Emin misiniz?",
      text: "Testi bitir'e bastın göndermek istediğine emin misin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, gönder!",
      cancelButtonText: "Hayır, teste devam et"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .post("solved-test", formatInput(myAnswers, user.id, id))
          .then((res) => {
            toast.success("Test başarıyla gönderildi");
            setLoading(false);
            navigate("/testısolved");
          })
          .catch((err) => {
            toast.error("Bir şeyler yanlış gitti!");
            // toast.error(err.response.data.message);
          });
      }
    });
  };

  const changeValue = (questionId, answerId, type, checked = null) => {
    if (type === 1) {
      // Tekil cevap
      let index = myAnswers.findIndex((x) => x.questionId === questionId);
      if (index === -1) {
        setMyAnswers((prev) => [
          ...prev,
          {
            questionId: questionId,
            answerId: answerId
          }
        ]);
      } else {
        let newMyAnswers = [...myAnswers]; // Kopya oluştur
        newMyAnswers[index].answerId = answerId;
        setMyAnswers(newMyAnswers);
      }
    } else if (type === 3) {
      // Çoklu cevap
      let index = myAnswers.findIndex((x) => x.questionId === questionId);
      if (index === -1) {
        setMyAnswers((prev) => [
          ...prev,
          {
            questionId: questionId,
            answerId: [answerId] // Birden fazla cevap için dizi kullanılacak
          }
        ]);
      } else {
        let newMyAnswers = [...myAnswers]; // Kopya oluştur
        if (checked === false) {
          // Eğer checked false ise, ilgili answerId'yi listeden çıkar
          const idIndex = newMyAnswers[index].answerId.indexOf(answerId);
          if (idIndex !== -1) {
            newMyAnswers[index].answerId.splice(idIndex, 1);
          }
        } else if (checked === true) {
          // Eğer checked true ise, ilgili answerId'yi listeye ekle
          if (!newMyAnswers[index].answerId.includes(answerId)) {
            newMyAnswers[index].answerId.push(answerId);
          }
        }
        setMyAnswers(newMyAnswers);
      }
    } else if (type === 2) {
      // Tekil cevap
      console.log("burada");
      let index = myAnswers.findIndex((x) => x.questionId === questionId);
      if (index === -1) {
        setMyAnswers((prev) => [
          ...prev,
          {
            questionId: questionId,
            answer_text: answerId
          }
        ]);
      } else {
        let newMyAnswers = [...myAnswers]; // Kopya oluştur
        newMyAnswers[index].answer_text = answerId;
        setMyAnswers(newMyAnswers);
      }
    } else {
      console.error("Hatalı tip");
    }
  };

  const imageUrl = (url) => {
    if (window.location.hostname == "localhost") return `http://localhost:8000/Image/` + url;
    return `https://testifybackend.necatiarman.dev/Image/` + url;
  };

  if (data.length === 0 || loading == true) {
    return <h1>Yükleniyor Lütfen Bekleyiniz</h1>;
  }

  return (
    <ContentBox className="analytics">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>{data.testName}</h1>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Card>
                <CardContent>
                  <h1 style={{ color: palette.primary.main }}>Test Bilgileri</h1>
                  <p>
                    Test İsmi: <b>{data.testName}</b>
                  </p>
                  <p>
                    Toplam Alınabilecek Puan: <b>{data.totalPoint} puan</b>
                  </p>
                  <p>
                    Test oluşturulma Tarihi: <b>{newDates(data.created_at)}</b>
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Card>
                <CardHeader style={{ color: palette.primary.main }} title="Sorular" />
                <form onSubmit={(e) => onSubmit(e)}>
                  <CardContent>
                    {questionDtata.map((item, index) => (
                      <CardContent sx={{ textAlign: "center" }}>
                        <Grid container>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <h2>
                              {index + 1}) {item.text} {`(${item.point} Puan)`}
                            </h2>
                          </Grid>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            {item.image_path && (
                              <img
                                src={imageUrl(item.image_path)}
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
                          {item.type == 1 ? (
                            <Grid container sx={{ mt: 1 }} spacing={1}>
                              {item.answers.map((answer, index) => (
                                <>
                                  {answer?.deleted_at == null && (
                                    <Grid item lg={3} md={12} sm={12} xs={12}>
                                      <Card sx={{ background: "#666666" }}>
                                        {answer.image_path && (
                                          <CardMedia
                                            sx={{
                                              height: 140,
                                              backgroundSize: "contain",
                                              backgroundRepeat: "no-repeat",
                                              backgroundPosition: "center"
                                            }}
                                            image={imageUrl(answer.image_path)}
                                            title="sorular"
                                            for={answer.id}
                                          />
                                        )}

                                        <CardActions>
                                          <input
                                            type="radio"
                                            name={`soru${item.id}`}
                                            checked={myAnswers.some(
                                              (x) =>
                                                x.questionId === item.id && x.answerId === answer.id
                                            )}
                                            value={answer.id}
                                            onChange={(e) => {
                                              changeValue(item.id, answer.id, 1);
                                            }}
                                            style={
                                              answer?.deleted_at
                                                ? { display: "none" }
                                                : {
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "50%"
                                                  }
                                            }
                                          />
                                          <h3 style={{ color: "white", fontWeight: "bold" }}>
                                            {answer.text}
                                          </h3>
                                          {/*  */}
                                        </CardActions>
                                      </Card>
                                    </Grid>
                                  )}
                                </>
                              ))}
                            </Grid>
                          ) : item.type == 2 ? (
                            // <div
                            //   style={{
                            //     display: "flex",
                            //     justifyContent: "center",
                            //     alignItems: "center",
                            //     marginTop: "10px"
                            //   }}
                            // >
                            //   <TextField
                            //     id="standard-basic"
                            //     label="Cevabınızı Giriniz"
                            //     fullWidth
                            //     multiline
                            //     sx={{ width: "700px" }}
                            //     onBlur={(e) => changeValue(item.id, e.target.value, 2)}
                            //   />
                            // </div>
                            <Grid container sx={{ mt: 1 }} spacing={1}>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                  id="standard-basic"
                                  label="Cevabınızı Giriniz"
                                  fullWidth
                                  multiline
                                  sx={{
                                    width: "700px",
                                    color: "white",
                                    fontWeight: "bold ",
                                    fontSize: "20px"
                                  }}
                                  onBlur={(e) => changeValue(item.id, e.target.value, 2)}
                                />
                              </Grid>
                            </Grid>
                          ) : (
                            <Grid container sx={{ mt: 1 }} spacing={1}>
                              {item.answers.map((answer, index) => (
                                <>
                                  {answer?.deleted_at == null && (
                                    <Grid item lg={3} md={12} sm={12} xs={12}>
                                      <Card sx={{ background: "#666666" }}>
                                        {answer.image_path && (
                                          <CardMedia
                                            sx={{
                                              height: 140,
                                              backgroundSize: "contain",
                                              backgroundRepeat: "no-repeat",
                                              backgroundPosition: "center"
                                            }}
                                            image={imageUrl(answer.image_path)}
                                            title="green iguana"
                                            for={answer.id}
                                          />
                                        )}
                                        <CardActions>
                                          <input
                                            type="checkbox"
                                            name={`soru${item.id}`}
                                            value={answer.id}
                                            onChange={(e) => {
                                              changeValue(item.id, answer.id, 3, e.target.checked);
                                            }}
                                            style={
                                              answer?.deleted_at
                                                ? { display: "none" }
                                                : {
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "50%"
                                                  }
                                            }
                                          />
                                          <h3 style={{ color: "white", fontWeight: "bold" }}>
                                            {answer.text}
                                          </h3>
                                          {/*  */}
                                        </CardActions>
                                      </Card>
                                    </Grid>
                                  )}
                                </>
                              ))}
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    ))}
                  </CardContent>
                  <CardActions sx={{ float: "right" }}>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                      Testi Bitir
                    </Button>
                  </CardActions>
                </form>
              </Card>
              {loading && <LinearProgress />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Modal
          open={open}
          onClose={handleOpenChange}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button onClick={handleOpenChange}>Close</Button>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button onClick={handleOpenChange}>Close</Button>
            </Grid>
          </Grid>
        </Modal>
      </div>
    </ContentBox>
  );
}

export default TestSolve;
