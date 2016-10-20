var express = require('express')
var port = process.env.PORT || 8810 // Might have some issues running it from your local machine. Best to run this on server
var baseConfig = require('./webpack.base.conf')
var path = require('path')

var app = express(),
  path = path.resolve(__dirname, '../');
  console.log(path)

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// server webpack outputs
app.set('appPath', path)


app.use('/mobile/app.js', express.static('./static/app.js'));
app.use('/mobile/assets', express.static('./assets'))
app.use('/dist/static', express.static('./static'))
app.use('/dist/assets', express.static('./assets'))
app.use('/admin/assets', express.static('./assets'))
app.use('/admin/static', express.static('./static'))
app.use('/static', express.static('./static'))
app.use('/assets', express.static('./assets'))

app.use(function (req, res, next) {
  console.log(req.path);
  next();
})
app.route('/*').get(function(req, res){
  res.sendFile(app.get('appPath') + '/index.html')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})