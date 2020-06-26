import React, { useState, useEffect } from 'react';
import axios from 'axios';
import servicePath from '../config/ApiUrl';
import {
    Form,
    Input,
    Button,
    DatePicker,
    message
} from 'antd';

const AddBook = (props) => {
    const [id, setId] = useState(0);
    const [bno, setBno] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [press, setPress] = useState('');
    const [pubDate, setPubDate] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState('');
    const [inventory, setInventory] = useState('');

    useEffect(() => {
        let tmpId = props.match.params.id;
        if (tmpId) {
            setBno(tmpId);
            getBookById(tmpId);
        }
    }, [])

    function onChange(date, dateString) {
        console.log(dateString)
        setPubDate(dateString);
    }
    const saveBook = () => {
        if (!bno) {
            message.error('编号不能为空');
            return false;
        } else if (!title) {
            message.error('类型不能为空');
            return false;
        } else if (!type) {
            message.error('学院不能为空');
            return false;
        } else if (!author) {
            message.error('必须选择身份');
            return false;
        } else if (!press) {
            message.error('类型不能为空');
            return false;
        } else if (!pubDate) {
            message.error('学院不能为空');
            return false;
        } else if (!price) {
            message.error('必须选择身份');
            return false;
        } else if (!total) {
            message.error('类型不能为空');
            return false;
        } else if (!inventory) {
            message.error('学院不能为空');
            return false;
        }

        let dataProps = {};   //传递到接口的参数
        dataProps.bno = bno;
        dataProps.type = type;
        dataProps.title = title;
        dataProps.press = press;
        dataProps.year = pubDate;
        dataProps.author = author;
        dataProps.price = price;
        dataProps.total = total;
        dataProps.stock = inventory;
        console.log(pubDate);

        if (id == 0) {
            console.log('id=:' + id)
            axios({
                method: 'POST',
                url: servicePath.addBook,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setId(res.data.insertId)
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败');
                    }
                }
            )
        } else {
            console.log('id=:' + id);
            dataProps.id = id;
            axios({
                method: 'POST',
                url: servicePath.updateBook,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('保存失败');
                    }
                }
            )
        }
    }

    const getBookById = (id) => {
        axios(servicePath.getBookById + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' },
        }).then(
            res => {
                console.log(res.data.data[0]);
                setId(res.data.data[0].id);
                setBno(res.data.data[0].bno);
                setType(res.data.data[0].type);
                setTitle(res.data.data[0].title);
                setAuthor(res.data.data[0].author);
                setPress(res.data.data[0].press);
                setPubDate(res.data.data[0].year);
                setPrice(res.data.data[0].price);
                setTotal(res.data.data[0].total);
                setInventory(res.data.data[0].stock);
            }
        )
    }
    return (
        <div>
            <Form >
                <Form.Item label="编号">
                    <Input value={bno} onChange={(e) => { setBno(e.target.value) }} />
                </Form.Item>
                <Form.Item label="类型">
                    <Input value={type} onChange={(e) => { setType(e.target.value) }} />
                </Form.Item>
                <Form.Item label="书名">
                    <Input value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </Form.Item>
                <Form.Item label="作者">
                    <Input value={author} onChange={(e) => { setAuthor(e.target.value) }} />
                </Form.Item>
                <Form.Item label="出版社">
                    <Input value={press} onChange={(e) => { setPress(e.target.value) }} />
                </Form.Item>
                <Form.Item label="出版日期">
                    <DatePicker onChange={onChange} />
                </Form.Item>
                <Form.Item label="价格">
                    <Input value={price} onChange={(e) => { setPrice(e.target.value) }} />
                </Form.Item>
                <Form.Item label="总数量">
                    <Input value={total} onChange={(e) => { setTotal(e.target.value) }} />
                </Form.Item>
                <Form.Item label="剩余数量">
                    <Input value={inventory} onChange={(e) => { setInventory(e.target.value) }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="middle" onClick={saveBook}> 添加图书 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddBook;