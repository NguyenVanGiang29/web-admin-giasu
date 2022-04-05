import React from 'react';
import { useFormik } from 'formik';
import { Grid, Typography, Button, Input, Breadcrumbs, Link } from '@material-ui/core';
import * as Yup from 'yup';
import PageTitle from "../../components/PageTitle/PageTitle";
import useStyles from './styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NameIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/AddCircle';

const Add = () => {
    const classes = useStyles();

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .min(2, 'Trường thông tin này quá ngắn')
                .max(50, 'Trường thông tin này quá dài!'),
            email: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .email('Email không đúng định dạng'),
            password: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .max(32, 'Trường thông tin này quá dài')
                .nullable(''),
        }
        ),
        onSubmit: values => {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/users',
                data: values,
            }).then(function (response) {
                console.log(response);
                history.goBack();
            }).catch(function (error) {
                console.log(error);
            })
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
                    Tài Khoản
                </Link>
                <Link className={classes.link}>
                    <AddIcon className={classes.symbolBreadcrumb} />
                    Thêm
                </Link>
            </Breadcrumbs>
            <form onSubmit={formik.handleSubmit}>
                <PageTitle title="Thêm tài khoản" />
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Typography variant="h6" component="h2" >
                            Tên người dùng
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <NameIcon className={classes.symbol} size="large" />
                            <Input
                                error={formik.touched.name && formik.errors?.name}
                                fullWidth
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </div>
                        {formik.errors.name && formik.touched.name ? (
                            <Typography variant='caption' color='error'>{formik.errors.name}</Typography>
                        ) : null}
                        <Typography variant="h6" component="h2" className={classes.itemName}>
                            Email
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <EmailIcon className={classes.symbol} />
                            <Input
                                error={formik.touched.email && formik.errors?.email}
                                fullWidth
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        {formik.errors.email && formik.touched.email ? (
                            <Typography variant='caption' color='error'>{formik.errors.email}</Typography>
                        ) : null}
                        <Typography variant="h6" component="h2" className={classes.itemName}>
                            Mật khẩu
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <PasswordIcon className={classes.symbol} />
                            <Input
                                error={formik.touched.password && formik.errors?.password}
                                fullWidth
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        {formik.errors.password && formik.touched.password ? (
                            <Typography variant='caption' color='error'>{formik.errors.password}</Typography>
                        ) : null}
                        <Typography />
                        <Button type="submit" color="primary" variant="contained" className={classes.itemName}>Thêm</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default Add;