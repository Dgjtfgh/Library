import React, { useState } from 'react'
import Head from 'next/head'

import '../static/style/index.css'
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../config/apiUrl'

export default function Home(list) {

    return (
        <div className="container" >
            <Head >
                <title > 图书管理系统 </title>
            </Head>
            <h2 className="title" align="center">图书管理系统</h2>
            <p align="center">知识就是力量^_^</p>
            <div align="center">
                <form>
                    <button type="submit" >
                        <Link href={{ pathname: '/query' }}>
                            <a>查询</a>
                        </Link><i className="em em-grinning"></i>
                    </button>
                    <button type="submit">
                        <Link href={{ pathname: '/borrow' }}>
                            <a>借书</a>
                        </Link><i className="em em-relaxed"></i>
                    </button>
                    <button type="submit">
                        <Link href={{ pathname: '/return' }}>
                            <a>还书</a>
                        </Link><i className="em em-kissing_heart"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}
