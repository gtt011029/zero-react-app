import React, { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Project = lazy(() => import('@/pages/Project'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Issue = lazy(() => import('@/pages/Issue'));

// 路由配置数组
const routes = [
    {
        path: '/',
        name: '首页',
        element: <Home />
    },
    {
        path: 'project',
        name: '项目',
        element: <Project />
    },
    {
        path: 'dashboard',
        name: '平台',
        hideInMenu: true,
        element: <Dashboard />
    },
    {
        path: 'issue',
        name: '问题',
        hideInMenu: true,
        element: <Issue />
    }
];

export default routes;
