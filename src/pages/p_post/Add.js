import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Grid, Typography, Button, Input, Link, Breadcrumbs, Box } from '@material-ui/core';
import * as Yup from 'yup';
import PageTitle from "../../components/PageTitle/PageTitle";
import Select from '@material-ui/core/NativeSelect';
import useStyles from './styles';
import NameIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/AddCircle';
import SubjectIcon from '@material-ui/icons/MenuBook';
import ClassIcon from '@material-ui/icons/Class';
import TopicIcon from '@material-ui/icons/Comment';
import MethodIcon from '@material-ui/icons/Wifi';
import PriceIcon from '@material-ui/icons/MonetizationOn';
import TimeIcon from '@material-ui/icons/AccessTime';
import DescIcon from '@material-ui/icons/LibraryBooks';
import LocationIcon from '@material-ui/icons/LocationOn';
import NumLessonIcon from '@material-ui/icons/ExposurePlus2';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Add = () => {
    const history = useHistory();
    const classes = useStyles();

    const [optionAcc, setOptionAcc] = useState([]);

    const optionNumLesson = [
        { key: 1, value: 'Chưa chọn', lable: 'Số buổi/tuần' },
        { key: 2, value: '1 buổi', lable: '1 buổi' },
        { key: 3, value: '2 buổi', lable: '2 buổi' },
        { key: 4, value: '3 buổi', lable: '3 buổi' },
        { key: 5, value: '4 buôit', lable: '4 buổi' },
    ];

    const optionTime = [
        { key: 1, value: 'Chưa chọn', lable: 'Thời lượng' },
        { key: 2, value: '1 giờ', lable: '1 giờ' },
        { key: 3, value: '1 giờ 30 phút', lable: '1 giờ 30 phút' },
        { key: 4, value: '2 giờ', lable: '2 giờ' },
        { key: 5, value: '2 giờ 30 phút', lable: '2 giờ 30 phút' },
    ];

    const optionMethod = [
        { key: 1, value: 'Chưa chọn', lable: 'Phương thức' },
        { key: 2, value: 'Offline', lable: 'Offline' },
        { key: 3, value: 'Online', lable: 'Online' },
    ];

    const optionSubject = [
        { key: 1, value: 'Chưa chọn', lable: 'Môn học' },
        { key: 2, value: 'Toán', lable: 'Toán' },
        { key: 3, value: 'Vật Lý', lable: 'Vật Lý' },
        { key: 4, value: 'Hóa Học', lable: 'Hóa Học' },
        { key: 5, value: 'Ngữ Văn', lable: 'Ngữ Văn' },
        { key: 6, value: 'Tiếng Anh', lable: 'Tiếng Anh' },
    ];

    const optionTopic = [
        { key: 1, value: 'Chưa chọn', lable: 'Chủ đề' },
        { key: 2, value: 'Cấp 1', lable: 'Cấp 1' },
        { key: 3, value: 'Cấp 2', lable: 'Cấp 2' },
        { key: 4, value: 'Cấp 3', lable: 'Cấp 3' },
        { key: 5, value: 'Ôn Thi Đại Học', lable: 'Ôn Thi Đại Học' },
        { key: 6, value: 'Ôn Thi Cấp 3', lable: 'Ôn Thi Cấp 3' },
    ];

    const optionClass = [
        { key: 0, value: 'Chưa chọn', lable: 'Lớp' },
        { key: 1, value: 'Lớp 1', lable: 'Lớp 1' },
        { key: 2, value: 'Lớp 2', lable: 'Lớp 2' },
        { key: 3, value: 'Lớp 3', lable: 'Lớp 3' },
        { key: 4, value: 'Lớp 4', lable: 'Lớp 4' },
        { key: 5, value: 'Lớp 5', lable: 'Lớp 5' },
        { key: 6, value: 'Lớp 6', lable: 'Lớp 6' },
        { key: 7, value: 'Lớp 7', lable: 'Lớp 7' },
        { key: 8, value: 'Lớp 8', lable: 'Lớp 8' },
        { key: 9, value: 'Lớp 9', lable: 'Lớp 9' },
        { key: 10, value: 'Lớp 10', lable: 'Lớp 10' },
        { key: 11, value: 'Lớp 11', lable: 'Lớp 11' },
        { key: 12, value: 'Lớp 12', lable: 'Lớp 12' },
    ];

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/parents'
        }).then(function (response) {
            console.log(response.data);
            setOptionAcc([...response.data]);
        }).catch(function (error) {
            console.log(error);
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            parent_id: '',
            subject: '',
            topic: '',
            class: '',
            method: '',
            price: '',
            time: '',
            phone: '',
            time_teaching: '',
            location: '',
            number_lesson: '',
            desc: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required('Trường thông tin này là bắt buộc'),
        }
        ),
        onSubmit: async values => {
            console.log(values);
            let formData = new FormData();
            try {
                formData.append('parent_id', values?.parent_id);
                formData.append('name', values?.name);
                formData.append('subject', values?.subject);
                formData.append('topic', values?.topic);
                formData.append('class', values?.class);
                formData.append('method', values?.method);
                formData.append('price', values?.price);
                formData.append('time', values?.time);
                formData.append('time_teaching', values?.time_teaching);
                formData.append('phone', values?.phone);
                formData.append('location', values?.location);
                formData.append('number_lesson', values?.number_lesson);
                formData.append('desc', values?.desc);
                await axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/p_posts ',
                    data: formData,
                }).then(function (response) {
                    history.goBack();
                }).catch(function (error) {
                    console.log(error);
                })
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <>
            <Breadcrumbs>
                <Link href="/"  >
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
                <Grid container spacing={1} style={{ marginLeft: '30px' }}>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h2" >
                            Người viết bài
                        </Typography>
                        <Box className={classes.inputSymbol}>
                            <NameIcon className={classes.symbol} />
                            <Select
                                id="parent_id"
                                name="parent_id"
                                value={formik.values.parent_id}
                                onChange={formik.handleChange}
                                fullWidth
                            >
                                {optionAcc.map((account) => (
                                    <option key={account.id} value={account.id}>{account.name}</option>
                                ))}
                            </Select>
                        </Box>
                        <Typography className={classes.nameItem} variant="h6" component="h2">
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
                                    <option key={sub.key} value={sub.value}>{sub.lable}</option>
                                ))}
                            </Select>
                        </Box>
                        <Typography className={classes.nameItem} variant="h6" component="h2">
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
                                    <option key={topic.key} value={topic.value}>{topic.lable}</option>
                                ))}
                            </Select>
                        </Box>
                        <Typography className={classes.nameItem} variant="h6" component="h2">
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
                                    <option key={c.key} value={c.value}>{c.lable}</option>
                                ))}
                            </Select>
                        </Box>
                        <Typography className={classes.nameItem} variant="h6" component="h2">
                            Địa điểm
                        </Typography>
                        <Box className={classes.inputSymbol}>
                            <LocationIcon className={classes.symbol} />
                            <Input
                                id="location"
                                name="location"
                                type="text"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                error={formik.touched.location && formik.errors?.location}
                                fullWidth
                            />
                        </Box>
                        <Typography className={classes.nameItem} variant="h6" component="h2">
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
                                style={{ display: 'block' }}
                                fullWidth
                            >
                                {optionMethod.map((method) => (
                                    <option key={method.key} value={method.value}>{method.lable}</option>
                                ))}
                            </Select>
                        </Box>
                        {formik.errors.job && formik.touched.job ? (
                            <Typography variant='caption' color='error'>{formik.errors.job}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
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
                            <Typography variant='caption' color='error'>{formik.errors.phone}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
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
                            <Typography variant='caption' color='error'>{formik.errors.phone}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
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
                                error={formik.touched.time_teaching && formik.errors?.time_teaching}
                                fullWidth
                            />
                        </Box>
                        {formik.errors.address && formik.touched.address ? (
                            <Typography variant='caption' color='error'>{formik.errors.address}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
                            Thời lượng dạy
                        </Typography>
                        <Box className={classes.inputSymbol}>
                            <MethodIcon className={classes.symbol} />
                            <Select
                                id="time"
                                name="time"
                                value={formik.values.time}
                                onChange={formik.handleChange}
                                error={formik.touched.time && formik.errors?.time}
                                style={{ display: 'block' }}
                                fullWidth
                            >
                                {optionTime.map((time) => (
                                    <option key={time.key} value={time.value}>{time.lable}</option>
                                ))}
                            </Select>
                        </Box>
                        <Typography className={classes.nameItem} variant="h6" component="h2">
                            Số buổi / tuần
                        </Typography>
                        <Box className={classes.inputSymbol}>
                            <NumLessonIcon className={classes.symbol} />
                            <Select
                                id="number_lesson"
                                name="number_lesson"
                                value={formik.values.number_lesson}
                                onChange={formik.handleChange}
                                error={formik.touched.time && formik.errors?.time}
                                style={{ display: 'block' }}
                                fullWidth
                            >
                                {optionNumLesson.map((lesson) => (
                                    <option key={lesson.key} value={lesson.value}>{lesson.lable}</option>
                                ))}
                            </Select>
                        </Box>
                    </Grid>
                </Grid>
                <Button type="submit" color="primary" variant="contained" style={{ margin: '40px 0px 0px 40px' }}>Thêm</Button>
            </form  >
        </>
    );
};

export default Add;
