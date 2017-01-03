
const router = app => {
  app.get('/hello', (req, res) => {
    res.send('hello')
  });
}
module.exports = router;