import { Link } from 'react-router-dom';
import React from 'react';
import menuList from '@/menuList';
import routes from '@/routes';
import styles from './index.less';

const Layout = ({ children }) => {
    const menuMap = (routes) => {
        if (routes.children) {
        
        } else {
        
        }
    };
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <nav>
                    <ul>
                        {
                            menuList.map((item) =>
                                <li key={item.path}>
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </header>
            
            <main>{children}</main>
            
            <footer>
                <h1>我是底部的内容</h1>
            </footer>
        </div>
    );
};

export default Layout;
