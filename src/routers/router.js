import React from "react";

//account
const AccountList = React.lazy(() => import("./../pages/account/List"));
const AccountAdd = React.lazy(() => import("./../pages/account/Add"));
const AccountEdit = React.lazy(() => import("./../pages/account/Edit"));
const AccountView = React.lazy(() => import("./../pages/account/View"));

//pages/tutor
const TutorList = React.lazy(() => import("./../pages/tutor/List"));
const TutorAdd = React.lazy(() => import("./../pages/tutor/Add"));
const TutorEdit = React.lazy(() => import("./../pages/tutor/Edit"));
const TutorView = React.lazy(() => import("./../pages/tutor/View"));

//pages/parent
const ParentList = React.lazy(() => import("./../pages/parent/List"));
const ParentAdd = React.lazy(() => import("./../pages/parent/Add"));
const ParentEdit = React.lazy(() => import("./../pages/parent/Edit"));
const ParentView = React.lazy(() => import("./../pages/parent/View"));

//pages/t_post
const TpostList = React.lazy(() => import("./../pages/t_post/List"));
const TpostAdd = React.lazy(() => import("./../pages/t_post/Add"));
const TpostEdit = React.lazy(() => import("./../pages/t_post/Edit"));
const TpostView = React.lazy(() => import("./../pages/t_post/View"));

//pages/p_post
const PpostList = React.lazy(() => import("./../pages/p_post/List"));
const PpostAdd = React.lazy(() => import("./../pages/p_post/Add"));
const PpostEdit = React.lazy(() => import("./../pages/p_post/Edit"));
const PpostView = React.lazy(() => import("./../pages/p_post/View"));



export const routers = [
  {
    path: "/app/accounts/add",
    component: AccountAdd,
  },
  {
    path: "/app/accounts/edit/:id",
    component: AccountEdit,
  },
  {
    path: "/app/accounts/view/:id",
    component: AccountView,
  },
  {
    path: "/app/accounts",
    component: AccountList,
  },
  {
    path: "/app/tutors/add",
    component: TutorAdd,
  },
  {
    path: "/app/tutors/edit/:id",
    component: TutorEdit,
  },
  {
    path: "/app/tutors/view/:id",
    component: TutorView,
  },
  {
    path: "/app/tutors",
    component: TutorList,
  },
  {
    path: "/app/parents/add",
    component: ParentAdd,
  },
  {
    path: "/app/parents/edit/:id",
    component: ParentEdit,
  },
  {
    path: "/app/parents/view/:id",
    component: ParentView,
  },
  {
    path: "/app/parents",
    component: ParentList,
  },
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
    path: "/app/t_posts",
    component: TpostList,
  },
  {
    path: "/app/p_posts/add",
    component: PpostAdd,
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
