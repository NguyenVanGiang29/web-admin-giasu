import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Grid,
  Box,
  Typography,
  Button,
  Input,
  Link,
  Breadcrumbs,
} from "@material-ui/core";
import * as Yup from "yup";
import PageTitle from "../../components/PageTitle/PageTitle";
import Select from "@material-ui/core/NativeSelect";
import useStyles from "./styles";
import NameIcon from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/PhoneIphone";
import ImageIcon from "@material-ui/icons/Image";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/AddCircle";
import SubjectIcon from "@material-ui/icons/MenuBook";
import ClassIcon from "@material-ui/icons/Class";
import TopicIcon from "@material-ui/icons/Comment";
import MethodIcon from "@material-ui/icons/Wifi";
import PriceIcon from "@material-ui/icons/MonetizationOn";
import TimeIcon from "@material-ui/icons/AccessTime";
import AchiIcon from "@material-ui/icons/EmojiEvents";
import ExpIcon from "@material-ui/icons/LocalLibrary";
import DescIcon from "@material-ui/icons/LibraryBooks";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Add = () => {
  const history = useHistory();
  const classes = useStyles();

  const [image, setImage] = useState("");

  const [optionAcc, setOptionAcc] = useState([]);

  const optionMethod = [
    { key: 1, value: "Chưa chọn", lable: "Phương thức" },
    { key: 2, value: "Offline", lable: "Offline" },
    { key: 3, value: "Online", lable: "Online" },
  ];

  const optionSubject = [
    { key: 1, value: "Chưa chọn", lable: "Môn học" },
    { key: 2, value: "Toán", lable: "Toán" },
    { key: 3, value: "Vật Lý", lable: "Vật Lý" },
    { key: 4, value: "Hóa Học", lable: "Hóa Học" },
    { key: 5, value: "Ngữ Văn", lable: "Ngữ Văn" },
    { key: 6, value: "Tiếng Anh", lable: "Tiếng Anh" },
  ];

  const optionTopic = [
    { key: 1, value: "Chưa chọn", lable: "Chủ đề" },
    { key: 2, value: "Cấp 1", lable: "Cấp 1" },
    { key: 3, value: "Cấp 2", lable: "Cấp 2" },
    { key: 4, value: "Cấp 3", lable: "Cấp 3" },
    { key: 5, value: "Ôn Thi Đại Học", lable: "Ôn Thi Đại Học" },
    { key: 6, value: "Ôn Thi Cấp 3", lable: "Ôn Thi Cấp 3" },
  ];

  const optionClass = [
    { key: 0, value: "Chưa chọn", lable: "Lớp" },
    { key: 1, value: "Lớp 1", lable: "Lớp 1" },
    { key: 2, value: "Lớp 2", lable: "Lớp 2" },
    { key: 3, value: "Lớp 3", lable: "Lớp 3" },
    { key: 4, value: "Lớp 4", lable: "Lớp 4" },
    { key: 5, value: "Lớp 5", lable: "Lớp 5" },
    { key: 6, value: "Lớp 6", lable: "Lớp 6" },
    { key: 7, value: "Lớp 7", lable: "Lớp 7" },
    { key: 8, value: "Lớp 8", lable: "Lớp 8" },
    { key: 9, value: "Lớp 9", lable: "Lớp 9" },
    { key: 10, value: "Lớp 10", lable: "Lớp 10" },
    { key: 11, value: "Lớp 11", lable: "Lớp 11" },
    { key: 12, value: "Lớp 12", lable: "Lớp 12" },
  ];

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/tutors",
    })
      .then(function (response) {
        setOptionAcc([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      tutor_id: "",
      subject: "",
      topic: "",
      class: "",
      method: "",
      price: "",
      phone: "",
      time_teaching: "",
      achievement: "",
      experience: "",
      desc: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Trường thông tin này là bắt buộc"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      let formData = new FormData();
      try {
        formData.append("tutor_id", values?.tutor_id);
        formData.append("name", values?.name);
        formData.append("subject", values?.subject);
        formData.append("topic", values?.topic);
        formData.append("class", values?.class);
        formData.append("method", values?.method);
        formData.append("price", values?.price);
        formData.append("time_teaching", values?.time_teaching);
        formData.append("phone", values?.phone);
        formData.append("achievement", values?.achievement);
        formData.append("experience", values?.experience);
        formData.append("desc", values?.desc);
        await axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/t_posts ",
          data: formData,
        })
          .then(function (response) {
            history.goBack();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Breadcrumbs>
        <Link href="/">
          <HomeIcon className={classes.symbolBreadcrumb} />
          Dashboard
        </Link>
        <Link className={classes.link}>
          <NameIcon className={classes.symbolBreadcrumb} />
          Bài đăng gia sư
        </Link>
        <Link className={classes.link}>
          <AddIcon className={classes.symbolBreadcrumb} />
          Thêm
        </Link>
      </Breadcrumbs>
      <form onSubmit={formik.handleSubmit}>
        <PageTitle title="Thêm Bài Đăng" />
        <Grid container spacing={1} style={{ marginLeft: "30px" }}>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2">
              Người viết bài
            </Typography>
            <Box className={classes.inputSymbol}>
              <NameIcon className={classes.symbol} />
              <Select
                id="tutor_id"
                name="tutor_id"
                value={formik.values.tutor_id}
                onChange={formik.handleChange}
                fullWidth
              >
                {optionAcc.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Môn dạy
            </Typography>
            <Box className={classes.inputSymbol}>
              <SubjectIcon className={classes.symbol} />
              <Select
                id="subject"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                fullWidth
              >
                {optionSubject.map((sub) => (
                  <option key={sub.key} value={sub.value}>
                    {sub.lable}
                  </option>
                ))}
              </Select>
            </Box>
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Chủ đề
            </Typography>
            <Box className={classes.inputSymbol}>
              <TopicIcon className={classes.symbol} />
              <Select
                id="topic"
                name="topic"
                value={formik.values.topic}
                onChange={formik.handleChange}
                fullWidth
              >
                {optionTopic.map((topic) => (
                  <option key={topic.key} value={topic.value}>
                    {topic.lable}
                  </option>
                ))}
              </Select>
            </Box>
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Lớp
            </Typography>
            <Box className={classes.inputSymbol}>
              <ClassIcon className={classes.symbol} />
              <Select
                id="class"
                name="class"
                value={formik.values.class}
                onChange={formik.handleChange}
                fullWidth
              >
                {optionClass.map((c) => (
                  <option key={c.key} value={c.value}>
                    {c.lable}
                  </option>
                ))}
              </Select>
            </Box>
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Thành tích
            </Typography>
            <Box className={classes.areaSymbol}>
              <AchiIcon className={classes.symbol} />
              <textarea
                className={classes.achieInput}
                id="achievement"
                name="achievement"
                type="text"
                value={formik.values.achievement}
                onChange={formik.handleChange}
                error={formik.touched.achievement && formik.errors?.achievement}
                fullWidth
                rows="5"
              />
            </Box>
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Thông tin thêm
            </Typography>
            <Box className={classes.areaSymbol}>
              <DescIcon className={classes.symbol} />
              <textarea
                className={classes.achieInput}
                id="desc"
                name="desc"
                type="text"
                value={formik.values.desc}
                onChange={formik.handleChange}
                error={formik.touched.desc && formik.errors?.desc}
                fullWidth
                rows="5"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2">
              Phương thức dạy
            </Typography>
            <Box className={classes.inputSymbol}>
              <MethodIcon className={classes.symbol} />
              <Select
                id="method"
                name="method"
                value={formik.values.method}
                onChange={formik.handleChange}
                error={formik.touched.method && formik.errors?.method}
                style={{ display: "block" }}
                fullWidth
              >
                {optionMethod.map((method) => (
                  <option key={method.key} value={method.value}>
                    {method.lable}
                  </option>
                ))}
              </Select>
            </Box>
            {formik.errors.job && formik.touched.job ? (
              <Typography variant="caption" color="error">
                {formik.errors.job}
              </Typography>
            ) : null}
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Giá dạy
            </Typography>
            <Box className={classes.inputSymbol}>
              <PriceIcon className={classes.symbol} />
              <Input
                id="price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && formik.errors?.price}
                fullWidth
              />
            </Box>
            {formik.errors.phone && formik.touched.phone ? (
              <Typography variant="caption" color="error">
                {formik.errors.phone}
              </Typography>
            ) : null}
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Số điện thoại
            </Typography>
            <Box className={classes.inputSymbol}>
              <PhoneIcon className={classes.symbol} />
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && formik.errors?.phone}
                fullWidth
              />
            </Box>
            {formik.errors.phone && formik.touched.phone ? (
              <Typography variant="caption" color="error">
                {formik.errors.phone}
              </Typography>
            ) : null}
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Thời gian dạy
            </Typography>
            <Box className={classes.inputSymbol}>
              <TimeIcon className={classes.symbol} />
              <Input
                id="time_teaching"
                name="time_teaching"
                type="text"
                value={formik.values.time_teaching}
                onChange={formik.handleChange}
                error={
                  formik.touched.time_teaching && formik.errors?.time_teaching
                }
                fullWidth
              />
            </Box>
            {formik.errors.address && formik.touched.address ? (
              <Typography variant="caption" color="error">
                {formik.errors.address}
              </Typography>
            ) : null}
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Kinh nghiệm
            </Typography>
            <Box className={classes.areaSymbol}>
              <ExpIcon className={classes.symbol} />
              <textarea
                className={classes.achieInput}
                id="experience"
                name="experience"
                type="text"
                value={formik.values.experience}
                onChange={formik.handleChange}
                error={formik.touched.experience && formik.errors?.experience}
                fullWidth
                rows="5"
              />
            </Box>
            <Typography
              className={classes.nameItem}
              variant="h6"
              component="h2"
            >
              Ảnh đại diện
            </Typography>
            <Box className={classes.inputSymbol}>
              <ImageIcon className={classes.symbol} />
              <Box className={classes.uploadBox}>
                <input
                  className={classes.inputImage}
                  id="avatar"
                  name="avatar"
                  type="file"
                  value={formik.values.avatar}
                  onChange={(e) => {
                    console.log(e);
                    setImage(e.target.files[0]);
                    console.log(image);
                    formik.handleChange(e);
                  }}
                  error={formik.touched.avatar && formik.errors?.avatar}
                />
                {image ? (
                  <img
                    className={classes.avatar}
                    alt=""
                    src={URL.createObjectURL(image)}
                  />
                ) : (
                  <img
                    className={classes.avatar}
                    alt=""
                    src={
                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    }
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{ margin: "40px 0px 0px 40px" }}
        >
          Thêm
        </Button>
      </form>
    </>
  );
};

export default Add;
