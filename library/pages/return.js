import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/style/borrow.css'


export default function Return() {
    const [returnID, setReturnID] = useState('');
    const [bookID, setBookID] = useState('');
    const [message, setMessage] = useState('');

    const handleClickReturn = () => {
        setMessage('');
        let dataProps = {};
        dataProps.cno = returnID;
        dataProps.bno = bookID;
        axios({
            method: 'POST',
            url: servicePath.returnBook,
            data: dataProps,
        }).then(
            res => {
                // setMessage('还书成功');
                // console.log(res.data)
                if (res.data.message === 0) {
                    setMessage('你未借阅该书!检查编号是否输入正确。');
                } else {
                    if (res.data.isScuccess) {
                        // setBook(res.data.data);
                        setMessage('还书成功');
                    } else {
                        setMessage('还书失败');
                    }
                }
            }
        )
    }
    const handleClickBack = () => {
        setMessage('');
        window.history.back(-1);
    }
    return (
        <div className="container">
            <h2 align="center">图书管理系统</h2>
            <h3 align="center">图书归还</h3>
            <div align="center">
                <form>
                    <div className="label">
                        借书证号:
                    </div>
                    <input className="text" placeholder="例如:3150102100" name="cno" onChange={(e) => setReturnID(e.target.value)}></input>
                    <div className="label">
                        图书号:
                    </div>
                    <input className="text" placeholder="例如:E0001" name="bno" onChange={(e) => setBookID(e.target.value)}></input>
                    <div className="button-div">
                        <button type="button" className="return" onClick={handleClickReturn}>点击还书</button>
                        <button type="button" className="back" onClick={handleClickBack}>返回</button>
                    </div>
                </form>
            </div>
            <p id="data" align="center">
                {message}
            </p>
            <div id="return">
            </div>
        </div>
    )
}
