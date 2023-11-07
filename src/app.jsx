import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import routes from './routes';
import Layout from '@/components/Layout';
import menuList from './menuList';

const App = () => {
    const routeMap = (routes) => {
        if (routes.children?.length) {
            routes.children.map(route => {
                return routeMap(route);
            });
        } else {
            return <Route key={routes.path} path={routes.path} element={routes.element} />;
        }
    };
    return (
        <div>
            <h1>这外面是否可以包一层呢</h1>
            <h2>哦，看起来可以，很棒， 那这边可以包一层</h2>
            <h3>为什么在这里不能直接加link呢</h3>
            <h4>看起来不是react-route导致的不能热更新， 而是那个css plugin, 但是不加这个的话， 好像css
                就不单独提取了，更具官方文档改一下呢，这样还不行吗，可以了可以了（原因： css plugin的 filename
                配置有误） </h4>
            <h4>这边看起来不对， 好像是页面整体刷了一下 ， 如何局部更新不刷新页面呢（答案： react18内置了局部热更新，
                只需要在webpack 中添加 react-refresh/babel plugin即可）</h4>
            <h5>但是现在还是有一个问题，我应该在什么地方写router呢, 我的路由跳转也不能写在home页啊（方案： Router
                里面包一层layout，写header 和footer）</h5>
            <h6>咋回事呢， less样式改了之后为什么浏览器就报错呢, 而且只有index.less样式才会这样</h6>
            <hr />
            <Router>
                <Layout>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {
                                routes.map(route => (
                                    <Route key={route.path} path={route.path} element={route.element} />
                                ))
                            }
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        </div>
    );
};

export default App;
