import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/style/borrow.css'

const Borrow = (props) => {
    const [borrowID, setBorrowID] = useState('');
    const [bookID, setBookID] = useState('');
    const [message, setMessage] = useState('');
    const [book, setBook] = useState([]);

    const handleClickBorrow = () => {
        setMessage('');
        setBook([]);
        let dataProps = {};
        dataProps.borrowID = borrowID;
        dataProps.bookID = bookID;
        axios({
            method: 'POST',
            url: servicePath.borrowBook,
            data: dataProps,
        }).then(
            res => {
                // console.log(res.data)
                if (res.data.message === 0) {
                    setMessage('该书暂无库存!');
                } else if (res.data.message === 1) {
                    setMessage('你已借阅该书，还未归还!');
                } else {
                    if (res.data.isScuccess) {
                        setBook(res.data.data);
                        setMessage('借书成功');
                    } else {
                        setMessage('借书失败');
                    }
                }
            }
        )
    }
    const handleClickBack = () => {
        setMessage('');
        setBook([]);
        window.history.back(-1);
    }
    return (
        <div className="container">
            <h2 align="center">图书管理系统</h2>
            <h3 align="center">图书借出</h3>
            <div align="center">
                <form>
                    <div className="label">
                        借书证号:
                    </div>
                    <input className="text" placeholder="例如:3150102100" name="cno" onChange={(e) => setBorrowID(e.target.value)}></input>
                    <div className="label">
                        图书号:
                    </div>
                    <input className="text" placeholder="例如:E0001" name="bno" onChange={(e) => setBookID(e.target.value)}></input>
                    <div className="button-div">
                        <button type="button" className="borrow" onClick={handleClickBorrow}>点击借书</button>
                        <button type="button" className="back" onClick={handleClickBack}>返回</button>
                    </div>
                </form>
            </div>
            <p align="center">
                {message}
            </p>
            <div id="borrow">
            {
                    book ? book.map((item, index) => {
                        return (
                            <div>
                                <text key={index}>图书编号：{item.bno}, 类型{item.type}, 书名{item.title}, 作者：{item.author}, 出版社：{item.press}, 出版日期：{item.year}, 价格：{item.price}, 总数：{item.total}, 库存：{item.stock}</text><br></br>
                            </div>
                        )
                    })
                        : ''
                }
            </div>
        </div>
    )
}


export default Borrow;