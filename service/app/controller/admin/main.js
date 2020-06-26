'use strict';

const Controller = require('egg').Controller;

class MainContoller extends Controller {
  async index() {
    // this.ctx.body = 'hi api';
    const result = await this.app.mysql.select('admin_user');
    this.ctx.body = {
      data: result,
    };
  }
  // 检验登录
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    // console.log(userName, password);
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = {
        data: '登录成功',
        openId,
      };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  // 获得顾客列表
  async getUserList() {
    const resList = await this.app.mysql.select('customer');
    this.ctx.body = { list: resList };
  }
  // 添加顾客信息
  async addUser() {
    const tmpArticle = this.ctx.request.body;
    // console.log(tmpArticle, '++++');
    const result = await this.app.mysql.insert('customer', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }
  // 删除顾客信息
  async delUser() {
    const cno = this.ctx.params.id;
    // console.log(cno, '+++');
    const res = await this.app.mysql.delete('customer', { cno });
    this.ctx.body = { data: res };
  }
  // 获得图书列表
  async getBookList() {
    const resList = await this.app.mysql.select('book');
    this.ctx.body = { list: resList };
  }
  // 添加图书
  async addBook() {
    const tmpArticle = this.ctx.request.body;
    console.log(tmpArticle);
    const result = await this.app.mysql.insert('book', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }
  // 修改图书信息
  async updateBook() {
    const tmpArticle = this.ctx.request.body;
    console.log(tmpArticle);
    const result = await this.app.mysql.update('book', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }
  // 删除图书
  async delBook() {
    const id = this.ctx.params.id;
    console.log(id);
    const res = await this.app.mysql.delete('book', { id });
    this.ctx.body = { data: res };
  }
  // 根据文章ID得到图书详情，用于修改图书
  async getBookById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT  * FROM book WHERE book.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

}

module.exports = MainContoller;
