const express = require('express')
const app = express()
const port = 3000

const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'main',
  layoutsDir: "views/layouts/",
}));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', {layout: 'page2'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

