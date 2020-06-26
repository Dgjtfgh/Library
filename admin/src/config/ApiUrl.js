let Url = 'http://127.0.0.1:7001/admin/' 

let servicePath = {
    checkLogin:Url + 'checkLogin' ,  // 检查用户名密码
    getUserList:Url + 'getUserList' ,  // 获得顾客列表
    addUser:Url + 'addUser' ,  // 添加顾客信息
    delUser:Url + 'delUser/' ,  // 删除顾客信息
    getBookList:Url + 'getBookList' ,  // 获得图书列表
    addBook:Url + 'addBook' ,  // 添加图书
    updateBook:Url + 'updateBook' ,  // 修改图书信息
    getBookById:Url + 'getBookById/' ,  // 根据文章ID得到图书详情，用于修改图书
    delBook:Url + 'delBook/' ,  // 删除图书
}
export default servicePath;