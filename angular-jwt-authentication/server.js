var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'akhdklajsdqwl561/sdaxcf';

var users = [
    {
        username: 'shenxiaolei',
        password: 'hi'
    },
    {
        username: 'liwei',
        password: 'oh'
    },
]

var currentuser = {};

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({secret: jwtSecret}).unless({path: ['/login']}));

app.get('/random-user', function (req, res) {
    var user = faker.helpers.userCard();
    user.avatar = faker.image.avatar();
    res.json(user);
});

app.get('/me', function (req, res) {
    res.send(req.user);
})

app.post('/login', authenticate, function (req, res) {
    var token = jwt.sign({
        username: currentuser.username
    }, jwtSecret);
    res.send({
        token: token,
        user: currentuser
    });
});

app.listen(3000, function () {
    console.log('App Listening on localhost:3000');
})

// authenticate
function authenticate(req, res, next) {
    var body = req.body;
    var login = false;
    if (!body.username || !body.password) {
        res.status(400).end('must provide username or password');
    }

    for(var i = 0; i < users.length;i++){
        if (body.username === users[i].username && body.password === users[i].password) {
            currentuser = users[i];
            login = true;
        }
    }

    if(!login){
        res.status(401).end('username or password incorrect');

    }
    next();


}