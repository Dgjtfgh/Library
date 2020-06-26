import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/style/query.css'

export default function Query() {
    const [queryValue, setQueryValue] = useState('');
    const [queryType, setQueryType] = useState('bno');
    const [list, setList] = useState([]);
    
    const handleClickQuery = () => {
        axios.get(servicePath.queryBook, {
            params: {
                type: queryType,
                value: queryValue
            }
        }).then(
            res => {
                if (res.data.data) {
                    console.log(res.data.data);
                    setList(res.data.data);
                } else {
                    console.log('未找到相关信息');
                }
            }
        )
    }
    const handleSelectType = (e) => {
        setQueryType(e.target.value);
    }
    const handleClickBack = () => {
        window.history.back(-1);
    }
    return (
        <div className="container">
            <h2 align="center">图书管理系统</h2>
            <h3 align="center">图书查询</h3>
            <div align="center">
                <form>
                    <div className="label">
                        搜索框:
                    </div>
                    <input className="text" placeholder="请输入要查找的内容" onChange={(e) => setQueryValue(e.target.value)}></input>
                    <br></br>
                    <select name="order" value={queryType} onChange={handleSelectType}>
                        <option value="bno">书号</option>
                        <option value="title">书名</option>
                        <option value="type">类型</option>
                        <option value="author">作者</option>
                    </select>
                    <div className="button-div">
                        <button type="button" className="query" onClick={handleClickQuery}>点击查询</button>
                        <button type="button" className="back" onClick={handleClickBack}>返回</button>
                    </div>
                </form >
            </div >
            <div id="data" className="result">
                {
                    list ? list.map((item, index) => {
                        return (
                            <div>
                                <text key={index}>图书编号：{item.bno}, 类型{item.type}, 书名{item.title}, 作者：{item.author}, 出版社：{item.press}, 出版日期：{item.year}, 价格：{item.price}, 总数：{item.total}, 库存：{item.stock}</text><br></br>
                            </div>
                        )
                    })
                        : <text>未找到相关信息</text>
                }
            </div>
        </div >
    )
}

// MyList.getInitialProps = async (context) => {
//     let id = context.query.id;
//     const promise = new Promise((resolve) => {
//         axios(servicePath.getListById+id).then(
//             (res) => {
//                 // console.log('---->', res.data);
//                 resolve(res.data);
//             }
//         )
//     })
//     return await promise;
// }

