const path = require('path');
const router = app => {
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}
module.exports = router;