import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useStyles from './styles';
import EmailIcon from '@material-ui/icons/Email';
import NameIcon from '@material-ui/icons/AccountCircle';
import JobIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import LocationIcon from '@material-ui/icons/LocationOn';
import ImageIcon from '@material-ui/icons/Image';

const View = () => {
    const { id } = useParams();
    const classes = useStyles();

    const [parent, setParent] = useState();

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/parents/${id}`,
        })
            .then(function (response) {
                setParent(...response.data);
            });
    }, [id]);

    return (
        <>
            {
                parent &&
                <Box>
                    <PageTitle title="Thông tin gia sư chi tiết" />
                    <Grid container spacing={1} style={{ marginLeft: '30px' }}>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="h2" >
                                Tên người dùng
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <NameIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {parent.name}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Email
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <EmailIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {parent.email}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Ảnh Đại Diện
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <ImageIcon className={classes.symbol} />
                                <Box className={classes.uploadBox}>
                                    {
                                        parent.avatar ?
                                            <img className={classes.avatar} alt="" src={`http://localhost:8000/storage/${parent.avatar}`} />
                                            :
                                            <img className={classes.avatar} alt="" src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} />
                                    }
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant="h6" component="h2" >
                                Công Việc
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <JobIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {parent.job}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Số Điện Thoại
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <PhoneIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {parent.phone}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Địa Chỉ
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <LocationIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {parent.address}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            }
        </>
    );
};

export default View;
