const express = require('express')
const app = express()
const path = require('path');
const port = 3000
const bodyParser = require("body-parser")

const clientService = 'http://localhost:5000/clients/info'

var request = require('request')
var cors = require('cors')
app.use(cors())
var mysql = require('mysql')

//database config
var connectionConfig = require('./connection_config')
var connection = mysql.createConnection(connectionConfig);

//body parser enables you to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// these two lines of code allows you to call images from a static folder
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
var Twit   = require('twit');
var config = require('./config');
const NewsAPI = require('newsapi');

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.
app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views
app.set('views', path.join(__dirname, 'views')); 

// Path to our public directory
app.use(express.static(__dirname + '/public'))   

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html'); 

app.get('/stock/info/:symbol', (req, res) => {

    var symbol = req.params.symbol

    res.send({
        symbol: symbol,
        name: `${symbol}  Inc.`,
        price: Math.random() * 100,
        sentiment: Math.random(),
        last_updated: new Date().toDateString()
    })
})

app.get('/stock/tweets/:symbol', (req, res) => {

    var symbol = '$' + req.params.symbol

    // configurations file that stores consumer key, consumer secret, token, token secret
    var T = new Twit(config);

    //q indicates the search keyword to find
    //count indicates number of tweets to return before function exists
    var params = { 
        q: symbol,
        count: 50
    }

    //search method in twit
    T.get('search/tweets', params, (err, data, response) => {

        var tweets = data.statuses
        var output = []

        for (var i = 0; i < tweets.length; i++) {
            var { user, text } = tweets[i]

            output.push({
                user: user.screen_name,
                text: text
            })
        }

        res.send(output)
    })
})

app.get('/stock/news/:symbol', (req,res) => {
    
    var symbol = req.params.symbol;

    //new NewsAPI object
    const newsapi = new NewsAPI('19fc75e113eb4f79bf08f5114cb741af');

    //use news api to search news related to symbol
    newsapi.v2.everything({
        sources: 'independent, bbc.co.uk, business-insider',
        q: symbol,
        language: 'en',
        sortBy: 'popularity'
      }).then(response => {          
        var output = [];
        //set limit to max 50 articles
        if (response.articles.length > 50) {
            news = response.articles.slice(1,50);
        } else {
            news = response.articles;
        }

        for (var i = 0; i < news.length; i++) {
            
            var {title, source, description, url, publishedAt} = news[i]

            output.push ({
                title: title,
                source: source.name,
                description: description,
                url: url,
                publish_date: publishedAt 
            })
        }
    
        res.send(output)

      });
})

app.get('/', (req,res) => {

    res.render('login')

})

app.post('/auth', (req, res) => {
    // console.log(req)
    //this allows password hash to return same value as mySQL password hash
    var mysqlPassword = require('mysql-password');
    var hashedPw = mysqlPassword(req.body.password);

    var username = req.body.login;
    connection.query(`SELECT * from client_info where username = "${username}"`, function(err, userdata) {
        if (err) {
            console.log('hello world')
            res.redirect('/')
        } else {
            if (userdata[0].hashed_pwd == hashedPw) {
                res.redirect('dashboard')
            } else {
                res.redirect('/')
            }
        }
    })    
})

app.get('/portfolio/:symbol' , (req,res) => {

    var symbol = req.params.symbol;

    connection.query(`SELECT * from client_portfolio where username = "${symbol}"`, function (err, data, fields){
        var output = [];
        if (err) {
            throw err;
        }

        console.log(data);

        for (var i = 0; i < data.length; i++) {
    
            var {username, stockname, quantity, buy_price, date_bought} = data[i];
    
            output.push({
                username: username,
                stockname: stockname,
                quantity: quantity,
                buy_price: buy_price,
                date_bought: date_bought
            })
        }
        res.send(output)
    })
})

app.get('/my_profile', (req,res) => {

    res.render('my_profile')

})

app.get('/dashboard', (req, res) => {

    clientApiKey = req.headers['x-apikey'] || 'appletanKEY'
    requestOptions = { 
        json: true, 
        headers: { 
            'x-apikey': clientApiKey 
        } 
    }

    // res.set('Access-Control-Allow-Origin', 'http://localhost:5000')

    request(clientService, requestOptions, (err, resp, body) => {
        
        if (err) {
            // res.render('error', {
            //     error: 'Please login before proceeding!'
            // })
            return console.log(err);
        }

        data = {
            username:    body.username,
            email:       body.email,
            userBalance: body.balance,
            stocks: [
                {ticker: 'AAPL', price: 10},
                {ticker: 'TSLA', price: 20},
                {ticker: 'MOMM', price: 30},
                {ticker: 'DADD', price: 40},
                {ticker: 'FADD', price: 50},
                {ticker: 'TATA', price: 60},
                {ticker: 'MAMA', price: 70},
                {ticker: 'PETA', price: 80},
                {ticker: 'JOJO', price: 90}
            ]
        }

        res.render('dashboard', data)
    })
})

app.get('/stocks', (req, res) => {
    res.render('panel/stockCards', {
        stocks: [
            {ticker: 'AAPL', price: 10},
            {ticker: 'TSLA', price: 20},
            {ticker: 'MOMM', price: 30},
            {ticker: 'DADD', price: 40},
            {ticker: 'FADD', price: 50},
            {ticker: 'TATA', price: 60},
            {ticker: 'MAMA', price: 70},
            {ticker: 'PETA', price: 80},
            {ticker: 'JOJO', price: 90}
        ]
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))