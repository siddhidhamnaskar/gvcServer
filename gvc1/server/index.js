const express=require('express');
const path=require('path');
const app=express();
const db=require('./models/index');
const daySchedule=require("./routes/daySchedule");
const record=require('./routes/minuteWiseData')
const dotenv=require('dotenv');
const cors=require("cors");
dotenv.config()


app.use(cors({
    origin: 'http://localhost:3001', // Allow requests only from this origin
    methods: 'GET,POST,PUT,DELETE',   // Specify the allowed HTTP methods
    // credentials: true,               // Allow sending cookies and HTTP authentication
  }));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/daySchedule',daySchedule);
app.use('/api',record)


app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

(async () => {
    await db.sequelize.sync();
})();

app.use((req, res, next) => {
    console.log(new Date().toLocaleDateString());
    next();
})

app.get('/', [
    (req, res, next) => {
        res.send('This is the home page!')
    }
]);

app.use(function(request, response, next) {
    console.log('This is global middleware!');
    next();
});

app.listen(8080);