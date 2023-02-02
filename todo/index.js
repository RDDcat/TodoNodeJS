const express = require('express');
const app = express();
var path = require('path');

app.listen(8082, function(){
    console.log('server at 8082');
});


app.get('/', (req, res, next) => {
    res.sendFile('/index.html', { root:  "./public" });
});

app.get('/todo', (req, res, next) => {
    res.sendFile('/todo.html', { root:  "./public" });
});

app.use(express.static(path.join(__dirname, 'public')));