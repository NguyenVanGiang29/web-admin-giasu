import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Grid, Typography, Button, TextField, Input, Link, Breadcrumbs } from '@material-ui/core';
import * as Yup from 'yup';
import PageTitle from "../../components/PageTitle/PageTitle";
import Select from '@material-ui/core/NativeSelect';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import useStyles from './styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EmailIcon from '@material-ui/icons/Email';
import NameIcon from '@material-ui/icons/AccountCircle';
import DateIcon from '@material-ui/icons/DateRange';
import JobIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import LocationIcon from '@material-ui/icons/LocationOn';
import ImageIcon from '@material-ui/icons/Image';
import SexIcon from '@material-ui/icons/Wc';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Add = () => {
    const history = useHistory();
    const classes = useStyles();

    const [image, setImage] = useState('');

    const [optionAcc, setOptionAcc] = useState([]);

    const optionJobs = [
        { key: '1', value: 'Chưa chọn', lable: 'Công việc' },
        { key: '2', value: 'Sinh viên', lable: 'Sinh viên' },
        { key: '3', value: 'Giáo viên', lable: 'Giáo viên' },
    ];

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/email'
        }).then(function (response) {
            setOptionAcc([...response.data]);
        }).catch(function (error) {
            console.log(error);
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            user_id: '',
            name: '',
            sex: '',
            job: '',
            birthday: '',
            address: '',
            phone: '',
            avatar: '',
        },
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
            let formData = new FormData();
            try {
                formData.append('user_id', values?.user_id);
                formData.append('name', values?.name);
                formData.append('sex', values?.sex);
                formData.append('job', values?.job);
                formData.append('birthday', values?.birthday);
                formData.append('address', values?.address);
                formData.append('phone', values?.phone);
                formData.append('avatar', image);
                await axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/tutors',
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
                    Gia sư
                </Link>
                <Link className={classes.link}>
                    <AddIcon className={classes.symbolBreadcrumb} />
                    Thêm
                </Link>
            </Breadcrumbs>
            <form onSubmit={formik.handleSubmit}>
                <PageTitle title="Thêm Gia sư" />
                <Grid container spacing={1} style={{ marginLeft: '30px' }}>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h2" >
                            Email khoản đăng ký
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <EmailIcon className={classes.symbol} />
                            <Select
                                id="user_id"
                                name="user_id"
                                value={formik.values.user_id}
                                onChange={formik.handleChange}
                            >
                                {optionAcc.map((account) => (
                                    <option key={account.id} value={account.id}>{account.email}</option>
                                ))}
                            </Select>
                        </div>
                        <Typography className={classes.nameItem} variant="h6" component="h2">
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
                                    value={formik.values.avatar}
                                    onChange={(e) => {
                                        console.log(e);
                                        setImage(e.target.files[0]);
                                        console.log(image);
                                        formik.handleChange(e);
                                    }}
                                    error={formik.touched.avatar && formik.errors?.avatar}
                                />
                                {
                                    image ?
                                        <img className={classes.avatar} alt="" src={URL.createObjectURL(image)} />
                                        :
                                        <img className={classes.avatar} alt="" src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} />
                                }
                            </div>
                        </div>
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
                                style={{ display: 'block' }}
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

                    </Grid>
                </Grid>
                <Button type="submit" color="primary" variant="contained" style={{ margin: '40px 0px 0px 40px' }}>Thêm</Button>
            </form  >

        </>
    );
};

export default Add;