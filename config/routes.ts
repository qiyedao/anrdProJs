export default [
  {
    path: '/',
    redirect: '/home',
  },

  {
    name: '首页',
    path: '/home',
    component: './Home',
    icon: 'HomeFilled',
    routes: [
      {
        name: '首页1',
        path: '/home/home1',
        component: './Home',
      },
    ],
  },

  {
    name: '权限演示',
    path: '/access',
    component: './Access',
    icon: 'HomeFilled',
    routes: [
      {
        name: 'access',
        path: '/access/home1',
        component: './Home',
      },
    ],
  },

  {
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
    icon: 'HomeFilled',
  },
];
