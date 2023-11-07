import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

const Dashboard = () => {
    const [data, setData] = useState({});
    
    useEffect(() => {
        setData({
            name: '212',
            age: 29
        });
        
        Promise.resolve().then(() => {
            console.log('这算一个异步吗');
        });
    }, []);
    
    return (
        <div className={'page'}>
            <h1 className={'spacicwefefef'}>我是主面板</h1>
            <Button type={'primary'}>调用antd的组件</Button>
            <Link to={'/project'}>去项目页面</Link>
            <div>{data.name}</div>
            <div>{data.age}</div>
        </div>
    
    );
};

export default Dashboard;
