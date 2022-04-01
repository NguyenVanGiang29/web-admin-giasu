import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
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

const View = () => {
    const { id } = useParams();
    const classes = useStyles();

    const [tutor, setTutor] = useState();

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/tutors/${id}`,
        })
            .then(function (response) {
                setTutor(...response.data);
            });
    }, [id]);

    return (
        <>
            {
                tutor &&
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
                                    {tutor.name}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Email
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <EmailIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {tutor.email}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Ngày Sinh
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <DateIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {tutor.birthday}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Giới Tính
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <SexIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {tutor.sex}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant="h6" component="h2" >
                                Công Việc
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <JobIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {tutor.job}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Số Điện Thoại
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <PhoneIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {tutor.phone}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Địa Chỉ
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <LocationIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {tutor.address}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Ảnh Đại Diện
                            </Typography>
                            <Box className={classes.inputSymbol}>
                            <ImageIcon className={classes.symbol} />
                            <Box className={classes.uploadBox}>
                                <input
                                    className={classes.inputImage}
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                />
                                {
                                    tutor.avatar ?
                                        <img className={classes.avatar} alt="" src={`http://localhost:8000/storage/${tutor.avatar}`} />
                                        :
                                        <img className={classes.avatar} alt="" src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} />
                                }
                            </Box>
                        </Box>
                        </Grid>
                    </Grid>
                </Box>
            }
        </>
    );
};

export default View;
