/* eslint-disable indent */
'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi api';
    }

    // eslint-disable-next-line no-dupe-class-members
    async all() {
        const sql = 'SELECT * FROM book';
        const result = await this.app.mysql.query(sql);
        this.ctx.body = {
            data: result,
        };
    }

    // 查询图书信息
    async queryBook() {
        const type = this.ctx.query.type;
        const value = this.ctx.query.value;
        let results;
        if (type === 'bno') {
            results = await this.app.mysql.select('book', {
                where: { bno: value },
            });
        } else if (type === 'title') {
            results = await this.app.mysql.select('book', {
                where: { title: value },
            });
        } else if (type === 'type') {
            results = await this.app.mysql.select('book', {
                where: { type: value },
            });
        } else if (type === 'author') {
            results = await this.app.mysql.select('book', {
                where: { author: value },
            });
        }
        console.log(results);
        this.ctx.body = {
            data: results,
        };
    }

    // async updateBook() {
    //     // ds
    // }

    async borrowBook() {
        const porpdata = this.ctx.request.body;
        console.log(porpdata);
        const book = await this.app.mysql.select('book', {
            where: { bno: porpdata.bookID },
        });
        // console.log(book[0]);
        const check = await this.app.mysql.select('borrow', {
            where: { bno: porpdata.bookID, cno: porpdata.borrowID },
        });
        console.log(check);
        if (check.length > 0) {
            console.log(check);
            this.ctx.body = {
                message: 1,
            };
            return;
        }
        if (book[0].stock <= 0) {
            this.ctx.body = {
                message: 0,
            };
            return;
        }
        const b_date = new Date();
        const r_date = new Date(b_date.setMonth(b_date.getMonth() + 2));
        const data = {
            cno: porpdata.borrowID,
            bno: porpdata.bookID,
            borrow_date: b_date,
            return_date: r_date,
            manager: '001',
        };
        const result = await this.app.mysql.insert('borrow', data);
        const insertSuccess = result.affectedRows === 1;
        const row = {
            bno: book[0].bno,
            type: book[0].type,
            title: book[0].title,
            press: book[0].press,
            year: book[0].year,
            author: book[0].author,
            price: book[0].price,
            total: book[0].total,
            stock: book[0].stock - 1,
            id: book[0].id,
        };
        const res = await this.app.mysql.update('book', row);
        const updateSuccess = res.affectedRows === 1;
        this.ctx.body = { isScuccess: insertSuccess && updateSuccess, data: book };

    }

    async returnBook() {
        const porpdata = this.ctx.request.body;
        console.log(porpdata);
        const book = await this.app.mysql.select('book', {
            where: { bno: porpdata.bno },
        });
        console.log(book[0]);
        const check = await this.app.mysql.select('borrow', {
            where: { bno: porpdata.bno, cno: porpdata.cno },
        });
        console.log(check);
        if (check.length <= 0) {
            console.log(check);
            this.ctx.body = {
                message: 0,
            };
            return;
        }
        const result = await this.app.mysql.delete('borrow', {
            cno: porpdata.cno,
            bno: porpdata.bno,
        });
        const row = {
            bno: book[0].bno,
            type: book[0].type,
            title: book[0].title,
            press: book[0].press,
            year: book[0].year,
            author: book[0].author,
            price: book[0].price,
            total: book[0].total,
            stock: book[0].stock + 1,
            id: book[0].id,
        };
        const res = await this.app.mysql.update('book', row);
        const updateSuccess = res.affectedRows === 1;
        this.ctx.body = { isScuccess: updateSuccess, data: result };
    }

}

module.exports = HomeController;
