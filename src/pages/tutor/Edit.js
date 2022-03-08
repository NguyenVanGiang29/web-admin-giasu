import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Grid, Typography, Button, TextField, Input, Link, Breadcrumbs } from '@material-ui/core';
import * as Yup from 'yup';
import PageTitle from "../../components/PageTitle/PageTitle";
import Select from '@material-ui/core/NativeSelect';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useStyles from './styles';
import EmailIcon from '@material-ui/icons/Email';
import NameIcon from '@material-ui/icons/AccountCircle';
import DateIcon from '@material-ui/icons/DateRange';
import JobIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import LocationIcon from '@material-ui/icons/LocationOn';
import ImageIcon from '@material-ui/icons/Image';
import SexIcon from '@material-ui/icons/Wc';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    const [tutor, setTutor] = useState();
    const [image, setImage] = useState();

    const initData = {
        email: '',
        name: '',
        sex: '',
        job: '',
        birthday: '',
        address: '',
        phone: '',
        avatar: '',
    };

    const optionJobs = [
        { key: '1', value: 'Chưa chọn', lable: 'Công việc' },
        { key: '2', value: 'Sinh viên', lable: 'Sinh viên' },
        { key: '3', value: 'Giáo viên', lable: 'Giáo viên' },
    ];

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/tutors/${id}`,
        })
            .then(function (response) {
                setTutor(...response.data);
            });
    }, [id]);

    useEffect(() => {
        if (tutor) {
            formik.setValues({
                ...tutor
            });
            setImage(tutor.avatar);
        }
    }, [tutor]);

    const formik = useFormik({
        initialValues: { ...initData, ...tutor },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .min(2, 'Trường thông tin này quá ngắn')
                .max(50, 'Trường thông tin này quá dài!'),
            sex: Yup.string()
                .required('Trường thông tin này là bắt buộc'),
            job: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .min(2, 'Trường thông tin này quá ngắn')
                .max(100, 'Trường thông tin này quá dài!'),
            birthday: Yup.string()
                .required('Trường thông tin này là bắt buộc'),
            address: Yup.string()
                .required('Trường thông tin này là bắt buộc'),
            phone: Yup.string()
                .required('Trường thông tin này là bắt buộc'),
        }
        ),
        onSubmit: async values => {
            console.log(values);
            let formData = new FormData();
            try {
                formData.append('user_id', id);
                formData.append('name', values?.name);
                formData.append('sex', values?.sex);
                formData.append('job', values?.job);
                formData.append('birthday', values?.birthday);
                formData.append('address', values?.address);
                formData.append('phone', values?.phone);
                formData.append('avatar', image);
                console.log(formData);
                await axios({
                    method: 'post',
                    url: `http://127.0.0.1:8000/api/tutors/${id}?_method=put`,
                    data: formData,
                }).then(function (response) {
                    console.log(response.data);
                    history.goBack();
                }).catch(function (error) {
                    console.log('error1', error);
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
                    Gia sư
                </Link>
                <Link className={classes.link}>
                    <EditIcon className={classes.symbolBreadcrumb} />
                    Sửa
                </Link>
            </Breadcrumbs>
            <form onSubmit={formik.handleSubmit} >
                <PageTitle title="Sửa thông tin gia sư" />
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h2" >
                            Tài khoản đăng ký
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <EmailIcon className={classes.symbol} />
                            <Input
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && formik.errors?.email}
                                fullWidth
                            />
                        </div>
                        <Typography variant="h6" component="h2" className={classes.nameItem}>
                            Tên người dùng
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <NameIcon className={classes.symbol} />
                            <Input
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && formik.errors?.name}
                                fullWidth
                            />
                        </div>
                        {formik.errors.name && formik.touched.name ? (
                            <Typography variant='caption' color='error'>{formik.errors.name}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
                            Ngày sinh
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <DateIcon className={classes.symbol} />
                            <TextField
                                id="birthday"
                                name="birthday"
                                type="date"
                                value={formik.values.birthday}
                                onChange={formik.handleChange}
                                error={formik.touched.birthday && formik.errors?.birthday}
                                fullWidth
                            />
                        </div>
                        {formik.errors.birthday && formik.touched.birthday ? (
                            <Typography variant='caption' color='error'>{formik.errors.birthday}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
                            Giới tính
                        </Typography>
                        <RadioGroup
                            id="sex"
                            name="sex"
                            value={formik.values.sex}
                            onChange={formik.handleChange}
                            error={formik.touched.sex && formik.errors?.sex}
                            className={classes.sexOption}
                        >
                            <SexIcon className={classes.symbol} />
                            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                        {formik.errors.sex && formik.touched.sex ? (
                            <Typography variant='caption' color='error'>{formik.errors.sex}</Typography>
                        ) : null}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h2">
                            Công việc
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <JobIcon className={classes.symbol} />
                            <Select
                                id="job"
                                name="job"
                                value={formik.values.job}
                                onChange={formik.handleChange}
                                error={formik.touched.job && formik.errors?.job}
                                fullWidth
                            >
                                {optionJobs.map((job) => (
                                    <option key={job.key} value={job.value}>{job.lable}</option>
                                ))}
                            </Select>
                        </div>
                        {formik.errors.job && formik.touched.job ? (
                            <Typography variant='caption' color='error'>{formik.errors.job}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
                            Số điện thoại
                        </Typography>
                        <div className={classes.inputSymbol}>
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
                        </div>
                        {formik.errors.phone && formik.touched.phone ? (
                            <Typography variant='caption' color='error'>{formik.errors.phone}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
                            Địa chỉ
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <LocationIcon className={classes.symbol} />
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && formik.errors?.address}
                                fullWidth
                            />
                        </div>
                        {formik.errors.address && formik.touched.address ? (
                            <Typography variant='caption' color='error'>{formik.errors.address}</Typography>
                        ) : null}
                        <Typography className={classes.nameItem} variant="h6" component="h2">
                            Ảnh đại diện
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <ImageIcon className={classes.symbol} />
                            <div className={classes.uploadDiv}>
                                <input
                                    className={classes.inputImage}
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    onChange={(e) => {
                                        console.log(e);
                                        setImage(e.target.files[0]);
                                        formik.handleChange(e);
                                        console.log(image);
                                    }}
                                    error={formik.touched.avatar && formik.errors?.avatar}
                                />
                                {
                                    image ?
                                        <img className={classes.avatar} alt="" src={`http://localhost:8000/storage/${image}`} />
                                        :
                                        <img className={classes.avatar} alt="" src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} />
                                }
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Button type="submit" color="primary" variant="contained" style={{ margin: '40px 0px 0px 40px' }}>Sửa</Button>
            </form  >

        </>
    );
};

export default Edit;