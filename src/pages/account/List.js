import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Button, IconButton, Breadcrumbs,Link } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import HomeIcon from '@material-ui/icons/Home';
import NameIcon from '@material-ui/icons/AccountCircle';

// components
import PageTitle from "../../components/PageTitle/PageTitle";

//call api
import axios from 'axios';

export default function List() {
  const history = useHistory();
  const [account, setAccount] = useState();
  const classes = useStyles();

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "name",
      label: "Tên",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "email",
      label: "MAIL",
      options: {
        filter: true,
        sort: true,
      }
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
              onClick={() => history.push(`accounts/edit/${tableMeta.rowData[0]}`)}
            >
              <EditIcon />
            </IconButton>
          )
        },
        filter: true,
        sort: false,
      }
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
              onClick={() => history.push(`accounts/view/${tableMeta.rowData[0]}`)}
            >
              <ViewIcon />
            </IconButton>
          )
        },
        filter: true,
        sort: false,
      }
    },
  ];

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/users',
    })
      .then(function (response) {
        setAccount(response.data);
      });
  }, []);

  const routeChange = () => {
    let path = `accounts/add`;
    history.push(path);
  }

  return (
    <>
      <Breadcrumbs>
        <Link href="/"  >
          <HomeIcon className={classes.symbolBreadcrumb} />
          Dashboard
        </Link>
        <Link  className={classes.link}>
          <NameIcon className={classes.symbolBreadcrumb} />
          Tài Khoản
        </Link>
      </Breadcrumbs>
      <PageTitle title="Tài khoản" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button 
            className={classes.buttonAdd}
            variant="contained" 
            color="secondary" 
            onClick={routeChange}
          >
            Thêm
            <AddIcon />
          </Button>
          <MUIDataTable
            title="Tài khoản người dùng"
            data={account}
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
