const express = require('express');
const multer  = require('multer')

const path = require('path'); // Import the path module
const app = express();
const port = 3000;



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'-'+file.originalname)
    }
  })
  
  const upload = multer({ storage:storage })


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend')); // Set the views directory

// Assuming you have a 'home.ejs' template in the 'views' directory
app.get('/', (req, res) => {
  res.render('home.ejs'); // Render 'home.ejs'
});


app.post('/upload', upload.single('image'), function (req, res) {
    console.log(req.body,"body, file",req.file)

    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  return(res.redirect("/"))
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
