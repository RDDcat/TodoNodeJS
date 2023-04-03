const axios = require('axios');
const express = require('express');
const app = express();
var path = require('path');

app.listen(3333, function(){
    console.log('server at 3333');
});


app.get('/', (req, res, next) => {
    res.sendFile('/index.html', { root:  "./public" });
});

app.get('/todo', (req, res, next) => {
    res.sendFile('/todo.html', { root:  "./public" });
});

app.get('/test/get', (req, res, next) => {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/previewCashBoard',
        params: {
        }
    })
    .then(response => res.json(response.data))
    .catch(function (error) {
        console.log(error);
    });
})

app.get('/test/post', (req, res, next) => {
    axios({
        url: 'http://127.0.0.1:8000/detailBoard',
        method: 'post',
        data: {
            id: '56313319'
        }
    })
    .then(function a(response) { 
        console.log(response) 
    })
    .catch(function (error) {
        console.log(error);
    });
})

app.use(express.static(path.join(__dirname, 'public')));