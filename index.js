var choo = require('choo')
var css = require('sheetify')

var config = require('./config')

var app = choo()
css('tachyons')

app.model(require('./models/app')(config))
app.model(require('./models/account')(config))
app.model(require('./models/messages')(config))
app.model(require('./models/sites')(config))

var layout = require('./elements/layout')
var auth = require('./elements/layout-authenticated')

app.router({ default: '/' }, [
  ['/', auth(require('./pages/main'))],
  ['/site', auth(require('./pages/site'))],
  ['/login', layout(require('./pages/accounts/login'))],
  ['/register', layout(require('./pages/accounts/register'))],
  ['/account', layout(require('./pages/accounts/account'))],
  ['/reset-password', layout(require('./pages/accounts/reset-password'))]
])

var tree = app.start()
document.body.appendChild(tree)
