import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Grid, Typography, Button, Input, Link, Breadcrumbs } from '@material-ui/core';
import * as Yup from 'yup';
import PageTitle from "../../components/PageTitle/PageTitle";
import Select from '@material-ui/core/NativeSelect';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useStyles from './styles';
import EmailIcon from '@material-ui/icons/Email';
import NameIcon from '@material-ui/icons/AccountCircle';
import JobIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import LocationIcon from '@material-ui/icons/LocationOn';
import ImageIcon from '@material-ui/icons/Image';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    const [parent, setParent] = useState();
    const [image, setImage] = useState();

    const initData = {
        email: '',
        name: '',
        job: '',
        address: '',
        phone: '',
        avatar: '',
    };

    const optionJobs = [
        { key: 1, value: 'Chưa chọn', lable: 'Công việc' },
        { key: 2, value: 'Kỹ Sư', lable: 'Kỹ Sư' },
        { key: 3, value: 'Xây Dưng', lable: 'Xây Dựng' },
        { key: 4, value: 'IT', lable: 'IT' },
        { key: 5, value: 'Văn Phòng', lable: 'Văn Phòng' },
        { key: 6, value: 'Thẩm Mỹ', lable: 'Thẩm Mỹ' },
        { key: 7, value: 'Giáo Viên', lable: 'Giáo Viên' },
    ];

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/parents/${id}`,
        })
            .then(function (response) {
                setParent(...response.data);
            });
    }, [id]);

    useEffect(() => {
        if (parent) {
            formik.setValues({
                ...parent
            });
            setImage(parent.avatar);
        }
    }, [parent]);

    const formik = useFormik({
        initialValues: { ...initData, ...parent },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .min(2, 'Trường thông tin này quá ngắn')
                .max(50, 'Trường thông tin này quá dài!'),
            job: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .min(2, 'Trường thông tin này quá ngắn')
                .max(100, 'Trường thông tin này quá dài!'),
            address: Yup.string()
                .required('Trường thông tin này là bắt buộc'),
            phone: Yup.string()
                .required('Trường thông tin này là bắt buộc'),
        }
        ),
        onSubmit: async values => {
            let formData = new FormData();
            try {
                formData.append('user_id', id);
                formData.append('name', values?.name);
                formData.append('job', values?.job);
                formData.append('address', values?.address);
                formData.append('phone', values?.phone);
                formData.append('avatar', image);
                await axios({
                    method: 'post',
                    url: `http://127.0.0.1:8000/api/parents/${id}?_method=put`,
                    data: formData,
                }).then(function (response) {
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
                    Phụ huynh
                </Link>
                <Link className={classes.link}>
                    <EditIcon className={classes.symbolBreadcrumb} />
                    Sửa
                </Link>
            </Breadcrumbs>
            <form onSubmit={formik.handleSubmit} >
                <PageTitle title="Sửa thông tin phụ huynh" />
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
                                        setImage(e.target.files[0]);
                                        formik.handleChange(e);
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
                    </Grid>
                </Grid>
                <Button type="submit" color="primary" variant="contained" style={{ margin: '40px 0px 0px 40px' }}>Sửa</Button>
            </form  >

        </>
    );
};

export default Edit;