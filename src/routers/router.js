import React from "react";

//pages/t_post
const TpostList = React.lazy(() => import("./../pages/t_post/List"));
const TpostAdd = React.lazy(() => import("./../pages/t_post/Add"));
const TpostEdit = React.lazy(() => import("./../pages/t_post/Edit"));
const TpostView = React.lazy(() => import("./../pages/t_post/View"));

//pages/t_post
const PpostList = React.lazy(() => import("./../pages/p_post/List"));
const PpostAdd = React.lazy(() => import("./../pages/p_post/Add"));
const PpostEdit = React.lazy(() => import("./../pages/p_post/Edit"));
const PpostView = React.lazy(() => import("./../pages/p_post/View"));

export const routers = [
  {
    path: "/app/t_posts/add",
    component: TpostAdd,
  },
  {
    path: "/app/t_posts/edit/:id",
    component: TpostEdit,
  },
  {
    path: "/app/t_posts/view/:id",
    component: TpostView,
  },
  {
    path: "/app/p_posts/add",
    component: PpostAdd,
  },
  {
    path: "/app/t_posts",
    component: TpostList,
  },
  {
    path: "/app/p_posts/edit/:id",
    component: PpostEdit,
  },
  {
    path: "/app/p_posts/view/:id",
    component: PpostView,
  },
  {
    path: "/app/p_posts",
    component: PpostList,
  },
];
