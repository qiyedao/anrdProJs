export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    hideInMenu: true,
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',

    access: 'canAdmin',
    icon: 'setting',
    customLevel: 1,

    // component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        access: 'canAdmin',

        // component: './Welcome',
        routes: [
          {
            path: '/admin/sub-page/subsub',
            name: 'sub-page',
            icon: 'smile',

            access: 'canAdmin',
            component: './TableList',
          },
          {
            path: '/admin/sub-page/subsub2',
            name: 'sub-page2',
            icon: 'smile',
            access: 'canAdmin',
            component: './TableList',
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/admin/sub-page2',
        name: 'sub-page2',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list',
    icon: 'table',
    path: '/list',
    component: './TableList',
    customLevel: 1,
  },
  {
    name: 'list2',
    icon: 'table',
    path: '/console/home/home',
    component: './TableList2',
    customLevel: 1,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
