import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Grid, Typography, Button, Input, Snackbar, Breadcrumbs, Link } from '@material-ui/core';
import * as Yup from 'yup';
import PageTitle from "../../components/PageTitle/PageTitle";
import axios from 'axios';
import Alert from '../../components/Alert/Message';
import useStyles from './styles';
import NameIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';


const Edit = () => {
    const { id } = useParams();
    const [account, setAccount] = useState();
    const history = useHistory();
    const initData = {
        name: '',
        email: '',
        password: '',
    };

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const classes = useStyles();

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/users/${id}`,
        })
            .then(function (response) {
                setAccount(...response.data);
            });
    }, [id]);

    useEffect(() => {
        if (account) {
            formik.setValues({ ...account });
        }
    }, [account]);

    const formik = useFormik({
        initialValues: { ...initData, ...account },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .min(2, 'Trường thông tin này quá ngắn')
                .max(50, 'Trường thông tin này quá dài!'),
            email: Yup.string()
                .email('Email không đúng định dạng')
                .required('Trường thông tin này là bắt buộc'),
            password: Yup.string()
                .required('Trường thông tin này là bắt buộc')
                .max(32, 'Trường thông tin này quá dài')
                .nullable(''),
        }
        ),
        onSubmit: values => {
            axios({
                method: 'put',
                url: `http://127.0.0.1:8000/api/users/${id}`,
                data: values,
            }).then(function (response) {
                console.log(response);
                setMessage(response.data.message);
                setOpen(true);
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
                    <EditIcon className={classes.symbolBreadcrumb} />
                    Sửa
                </Link>
            </Breadcrumbs>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <PageTitle title="Sửa tài khoản" />
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <Typography variant="h6" component="h2" >
                            Tên người dùng
                        </Typography>
                        <div className={classes.inputSymbol}>
                            <NameIcon className={classes.symbol} />
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
                        <Button type="submit" color="primary" variant="contained" className={classes.itemName}>Sửa</Button>
                    </form  >
                </Grid>
            </Grid>
        </>
    )
}

export default Edit