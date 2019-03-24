const express = require('express')
const app = express()
const path = require('path');
const port = 3000

const clientService = 'http://localhost:5000/clients/info'

var request = require('request')

var cors = require('cors')
app.use(cors())

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

app.options('/', (req, res) => {
    console.log(req)
})

app.get('/', (req, res) => {

    clientApiKey = req.headers['x-apikey'] || 'appletanKEY'
    requestOptions = { 
        json: true, 
        headers: { 
            'x-apikey': clientApiKey 
        } 
    }

    res.set('Access-Control-Allow-Origin', 'http://localhost:5000')

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