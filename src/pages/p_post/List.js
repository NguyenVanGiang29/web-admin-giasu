import React, { useState, useEffect, useMemo } from "react";
import { Grid, Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

//call api
import axios from "axios";

const List = () => {
  const history = useHistory();
  const [tpost, setTpost] = useState();
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
      name: "subject",
      label: "Môn dạy",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "class",
      label: "Lớp",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "method",
      label: "Hình thức",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "topic",
      label: "Chủ đề",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "location",
      label: "Địa điểm",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Số điện thoại ",
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
                history.push(`p_posts/edit/${tableMeta.rowData[0]}`)
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
                history.push(`p_posts/view/${tableMeta.rowData[0]}`)
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
  ], []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/p_posts",
    }).then(function (response) {
      setTpost(response.data);
    });
  }, []);

  const routeChange = () => {
    let path = `p_posts/add`;
    history.push(path);
  };

  return (
    <>
      <PageTitle title="Bài đăng" />
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
            title="Bài đăng của Gia sư"
            data={tpost}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default List;
