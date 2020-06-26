import React, { useState, useEffect } from 'react';
import '../static/style/List.css';
import { List, Row, Col, Modal, message, Button } from 'antd';
import axios from 'axios';
import servicePath from '../config/ApiUrl';

const { confirm } = Modal;

function ArticleList(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        getList();
    }, [])
    const getList = () => {
        axios({
            method: 'GET',
            url: servicePath.getBookList,
            withCredentials: true,
        }).then(
            res => {
                console.log(res.data);
                setList(res.data.list);
            }
        )
    }

    const updateBook = (id,checked)=>{
        props.history.push('/index/addBook/'+id);
    }

    const delBook = (id) => {
        console.log(id);
        confirm({
            title: '确定要删除该图书信息吗?',
            content: '如果你点击OK按钮，信息将会永远被删除，无法恢复。',
            onOk() {
                axios(servicePath.delBook + id, { withCredentials: true }).then(
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
                        <Col span={3}>
                            <b>编号</b>
                        </Col>
                        <Col span={3}>
                            <b>类型</b>
                        </Col>
                        <Col span={3}>
                            <b>书名</b>
                        </Col>
                        <Col span={3}>
                            <b>作者</b>
                        </Col>
                        <Col span={3}>
                            <b>价格</b>
                        </Col>
                        <Col span={3}>
                            <b>总数</b>
                        </Col>
                        <Col span={2}>
                            <b>库存</b>
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
                            <Col span={3}>
                                {item.bno}
                            </Col>
                            <Col span={3}>
                                {item.type}
                            </Col>
                            <Col span={3}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                <span>{item.author}</span>
                            </Col>
                            <Col span={3}>
                                {item.price}
                            </Col>
                            <Col span={3}>
                                {item.total}
                            </Col>
                            <Col span={2}>
                                {item.stock}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" size="samll" onClick={() => {updateBook(item.id)}}>修改</Button>
                                <Button size="middle" onClick={() => {delBook(item.id)}} >删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )

}

export default ArticleList