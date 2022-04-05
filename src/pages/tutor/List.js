import React, { useState, useEffect, useMemo } from "react";
import { Grid, Button, IconButton, Link, Breadcrumbs } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import HomeIcon from "@material-ui/icons/Home";
import NameIcon from "@material-ui/icons/AccountCircle";
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

//call api
import axios from "axios";

export default function List() {
  const history = useHistory();
  const [tutor, setTutor] = useState();
  const classes = useStyles();

  const columns = useMemo(() => [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Tên",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "sex",
      label: "Giới tính",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "job",
      label: "Công việc",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Địa chỉ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Số điện thoại",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "edit",
      label: "Sửa",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              className={classes.editButton}
              variant="contained"
              color="primary"
              size="small"
              onClick={() =>
                history.push(`tutors/edit/${tableMeta.rowData[0]}`)
              }
            >
              <EditIcon />
            </IconButton>
          );
        },
        filter: true,
        sort: false,
      },
    },
    {
      name: "view",
      label: "Xem",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              className={classes.viewButton}
              variant="contained"
              size="small"
              onClick={() =>
                history.push(`tutors/view/${tableMeta.rowData[0]}`)
              }
            >
              <ViewIcon />
            </IconButton>
          );
        },
        filter: true,
        sort: false,
      },
    },
  ], [tutor]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/tutors",
    }).then(function (response) {
      setTutor(response.data);
    });
  }, []);

  const routeChange = () => {
    let path = `tutors/add`;
    history.push(path);
  };

  return (
    <>
      <Breadcrumbs>
        <Link href="/">
          <HomeIcon className={classes.symbolBreadcrumb} />
          Dashboard
        </Link>
        <Link className={classes.link}>
          <NameIcon className={classes.symbolBreadcrumb} />
          Gia sư
        </Link>
      </Breadcrumbs>
      <PageTitle title="Gia sư" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
            onClick={routeChange}
          >
            Thêm
            <AddIcon />
          </Button>
          <MUIDataTable
            title="Tài khoản người dùng"
            data={tutor}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}