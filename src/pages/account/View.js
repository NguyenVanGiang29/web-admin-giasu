import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageTitle from '../../components/PageTitle/PageTitle';
import { Grid, Typography, Breadcrumbs, Link } from '@material-ui/core';
import NameIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import useStyles from './styles';
import HomeIcon from '@material-ui/icons/Home';
import DetailIcon from '@material-ui/icons/Details';

const View = () => {
    const classes = useStyles();

    const { id } = useParams()

    const [account, setAccount] = useState();

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/users/${id}`,
        }).then(function (response) {
            setAccount(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }, [id]);

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
                    <DetailIcon className={classes.symbolBreadcrumb} />
                    Chi tiết
                </Link>
            </Breadcrumbs>
            {
                account &&
                <div>
                    <PageTitle title="Thông tin tài khoản" />
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <Typography variant="h6" component="h2" >
                                Tên người dùng
                            </Typography>
                            <div className={classes.inputSymbol}>
                                <NameIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {account[0].name}
                                </Typography>
                            </div>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Email
                            </Typography>
                            <div className={classes.inputSymbol}>
                                <EmailIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {account[0].email}
                                </Typography>
                            </div>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Mật khẩu
                            </Typography>
                            <div className={classes.inputSymbol}>
                                <PasswordIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {account[0].password}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            }
        </>
    )
}

export default View