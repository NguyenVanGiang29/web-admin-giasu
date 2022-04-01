import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Slide, Switch, FormControlLabel } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useStyles from './styles';
import EmailIcon from '@material-ui/icons/Email';
import NameIcon from '@material-ui/icons/AccountCircle';
import JobIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import LocationIcon from '@material-ui/icons/LocationOn';
import SubjectIcon from '@material-ui/icons/MenuBook';
import ClassIcon from '@material-ui/icons/Class';
import TopicIcon from '@material-ui/icons/Comment';
import MethodIcon from '@material-ui/icons/Wifi';
import PriceIcon from '@material-ui/icons/MonetizationOn';
import TimeIcon from '@material-ui/icons/AccessTime';
import AchiIcon from '@material-ui/icons/EmojiEvents';
import ExpIcon from '@material-ui/icons/LocalLibrary';
import DescIcon from '@material-ui/icons/LibraryBooks';

const View = () => {
    const { id } = useParams();
    const classes = useStyles();

    const [ppost, setPpost] = useState();

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/p_posts/view/${id}`,
        })
            .then(function (response) {
                console.log(response.data);
                setPpost([...response.data]);
            });
    }, [id]);

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <>
            {
                ppost &&
                <Box>
                    <PageTitle title="Thông tin bài đăng" />
                    <Grid container spacing={1} style={{ marginLeft: '30px' }}>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="h2" >
                                Môn dạy
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <SubjectIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].subject}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Chủ đề
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <TopicIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].topic}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Lớp
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <ClassIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].class}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Địa điểm
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <AchiIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].location}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Thời lượng dạy
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <ExpIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].time}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant="h6" component="h2" >
                                Hình thức dạy
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <MethodIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].method}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Giá dạy / giờ
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <PriceIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].price}.000 nghìn đồng
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Số điện thoại
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <PhoneIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].phone}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Thời gian dạy
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <TimeIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].time_teaching}
                                </Typography>
                            </Box>
                            <Typography className={classes.nameItem} variant="h6" component="h2" >
                                Thông tin thêm
                            </Typography>
                            <Box className={classes.inputSymbol}>
                                <DescIcon className={classes.symbol} />
                                <Typography className={classes.info}>
                                    {ppost[0].desc}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <PageTitle title="Thông tin phụ huynh" />
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} />}
                        label="Show"
                    />
                    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                        <Grid container spacing={1} style={{ marginLeft: '30px' }}>
                            <Grid item xs={6}>
                                <Typography variant="h6" component="h2" >
                                    Tên phụ huynh
                                </Typography>
                                <Box className={classes.inputSymbol}>
                                    <NameIcon className={classes.symbol} />
                                    <Typography className={classes.info}>
                                        {ppost[2].name}
                                    </Typography>
                                </Box>
                                <Typography className={classes.nameItem} variant="h6" component="h2" >
                                    Email
                                </Typography>
                                <Box className={classes.inputSymbol}>
                                    <EmailIcon className={classes.symbol} />
                                    <Typography className={classes.info}>
                                        {ppost[2].email}
                                    </Typography>
                                </Box>
                                <Typography className={classes.nameItem} variant="h6" component="h2" >
                                    Địa Chỉ
                                </Typography>
                                <Box className={classes.inputSymbol}>
                                    <LocationIcon className={classes.symbol} />
                                    <Typography className={classes.info}>
                                        {ppost[1].address}
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
                                        {ppost[1].job}
                                    </Typography>
                                </Box>
                                <Typography className={classes.nameItem} variant="h6" component="h2" >
                                    Số Điện Thoại
                                </Typography>
                                <Box className={classes.inputSymbol}>
                                    <PhoneIcon className={classes.symbol} />
                                    <Typography className={classes.info}>
                                        {ppost[1].phone}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Slide>
                </Box>
            }
        </>
    );
};

export default React.memo(View)
