const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

var port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use('/images', express.static(process.cwd() + '/images'))

app.use(function(req, res) {
  res.status(404).send({url: req.url + ' not found'})
});

if(!module.parent) {
  app.listen(port, () => console.log('Node app listening on port :' + port + '!'));
}
module.exports = app;