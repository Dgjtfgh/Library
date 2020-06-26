import React, { useState, useEffect } from 'react';
import '../static/style/List.css';
import { List, Row, Col, Modal, message, Button } from 'antd';
import axios from 'axios';
import servicePath from '../config/ApiUrl';

const { confirm } = Modal;

function UserList(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        getList();
    }, [])
    const getList = () => {
        axios({
            method: 'GET',
            url: servicePath.getUserList,
            withCredentials: true,
        }).then(
            res => {
                console.log(res.data);
                setList(res.data.list);
            }
        )
    }

    // const updateUser = (id,checked)=>{
    //     props.history.push('/index/addUser/'+id);
    // }

    const delUser = (id) => {
        console.log(id);
        confirm({
            title: '确定要删除这条信息吗?',
            content: '如果你点击OK按钮，信息将会永远被删除，无法恢复。',
            onOk() {
                axios(servicePath.delUser + id, { withCredentials: true }).then(
                    res => {
                        message.success('信息删除成功');
                        getList();
                    }
                )
            },
            onCancel() {
                message.success('没有任何改变');
            },
        });
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>编号</b>
                        </Col>
                        <Col span={4}>
                            <b>姓名</b>
                        </Col>
                        <Col span={4}>
                            <b>身份</b>
                        </Col>
                        <Col span={4}>
                            <b>学院</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.cno}
                            </Col>
                            <Col span={4}>
                                {item.name}
                            </Col>
                            <Col span={4}>
                                {item.type}
                            </Col>
                            <Col span={4}>
                                {item.department}
                            </Col>
                            <Col span={4}>
                                <Button size="middle" onClick={() => {delUser(item.cno)}} >删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )

}

export default UserList