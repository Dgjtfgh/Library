import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../static/style/Admin.css';
import { Route } from 'react-router-dom';
import Index from './Index';
import UserList from './UserList';
import AddUser from './AddUser';
import BookList from './BookList';
import AddBook from './AddBook';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Admin(props) {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    const handleClickIndex = () => {
        props.history.push('/index');
    }

    const handleClickUser = e => {
        console.log(e.item.props);
        if (e.key == 'addUser') {
            props.history.push('/index/addUser');
        } else {
            props.history.push('/index/UserList');
        }
    }

    const handleClickBook = e => {
        console.log(e.item.props);
        if (e.key == 'addBook') {
            props.history.push('/index/addBook');
        } else {
            props.history.push('/index/bookList');
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<DesktopOutlined />} onClick={handleClickIndex}>
                        首页
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        onClick={handleClickUser}
                        icon={<UserOutlined />}
                        title="用户管理"
                    >
                        <Menu.Item key="userList">用户列表</Menu.Item>
                        <Menu.Item key="addUser">添加用户</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        onClick={handleClickBook}
                        icon={<FileOutlined />}
                        title="图书管理"
                    >
                        <Menu.Item key="bookList">图书列表</Menu.Item>
                        <Menu.Item key="addBook">添加图书</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div>
                            <Route path="/index" exact component={Index} />
                            <Route path="/index/addUser" exact component={AddUser} />
                            <Route path="/index/addBook/:id" exact component={AddBook} />
                            <Route path="/index/UserList" exact component={UserList} />
                            <Route path="/index/addBook" exact component={AddBook} />
                            <Route path="/index/bookList" exact component={BookList} />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>图书管理后台系统</Footer>
            </Layout>
        </Layout>
    );
}

// ReactDOM.render(<SiderDemo />, mountNode);
export default Admin;