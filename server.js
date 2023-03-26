const express = require('express')
const app = express()
const port = 3000

const expressHbs = require('express-handlebars');

const { default: mongoose } = require('mongoose');

const uri = 'mongodb+srv://lehongduybk:password@cluster0.mmpj6ea.mongodb.net/cp17310?retryWrites=true&w=majority';

app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  // defaultLayout: 'main',
  // layoutsDir: "views/layouts/",
}));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {

  mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

  //res.render('home');
  res.render('home', {
    kq: 22,
    soA: 15,
    soB: 7,
    operator: 'cong'
  });
});


const svModel = require("./svModel");

app.get("/add_sv", async (request, response) => {

  console.log(request.body);

  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

  const sv = new svModel();
  sv.ten = 'Trần Phương Thảo';
  sv.tuoi = 22;
  sv.diachi = 'HCM';

  console.log('vao day');
  console.log(sv);
 
  try {
    await sv.save();
    response.send(sv);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/get_sv", async (request, response) => {

  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

  const sinhviens = await svModel.find({tuoi : 21});

  try {
    console.log(sinhviens);
    response.send(sinhviens);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

