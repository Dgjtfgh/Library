/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getUserList', controller.admin.main.getUserList);
  router.post('/admin/addUser', adminauth, controller.admin.main.addUser);
  router.get('/admin/delUser/:id', adminauth, controller.admin.main.delUser);
  router.get('/admin/getBookList', controller.admin.main.getBookList);
  router.get('/admin/getBookById/:id', adminauth, controller.admin.main.getBookById);
  router.post('/admin/addBook', adminauth, controller.admin.main.addBook);
  router.post('/admin/updateBook', adminauth, controller.admin.main.updateBook);
  router.get('/admin/delBook/:id', adminauth, controller.admin.main.delBook);
};
