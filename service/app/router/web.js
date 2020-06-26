// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  router.get('/web/index', controller.web.home.index);
  router.get('/web/queryBook', controller.web.home.queryBook);
  router.post('/web/borrowBook', controller.web.home.borrowBook);
  // router.post('/web/updateBook', controller.web.home.updateBook);
  router.post('/web/returnBook', controller.web.home.returnBook);
};
