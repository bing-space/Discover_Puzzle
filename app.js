const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash');
const session =  require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const puzzleRoutes = require('./routes/puzzles')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')

mongoose.connect('mongodb://127.0.0.1:27017/discover-puzzle')
    .then(() =>{
        console.log("Connection Open")
    })
    .catch(err => {
        console.log("Error.......")
        console.log(err)
    })

// Middleware
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
const sessionConfig = {
    secret: 'thisisnotagoodsecret', 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        httpOnly: true,
        expires: Date.now() + 100 * 60 * 60 * 24 * 7,
        maxAge: 100 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

/** 
 * User Section
 */ 
app.use('/', userRoutes)

/**
 * CRUD Section
 */
app.get('/', (req, res) => {
    res.render('home')
})

app.use('/puzzles',puzzleRoutes)

/**
 * CRUD Section: Review
 */
app.use('/puzzles/:id/reviews', reviewRoutes)


// Handle Error
app.all('*', (req,res,next) => {
    next(new ExpressError('Page Not Found',404))
})
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong'
    res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})