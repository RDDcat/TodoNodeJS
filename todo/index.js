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
    axios.post('http://18.183.199.196:8000/backend-service/store/',
    {
        userId : 3,
        storageId : 20
    })
    .then((res)=>{
        console.log(res)
    })
    // axios({
    //     url: 'http://18.183.199.196:8000/backend-service/user/history/detail',
    //     method: 'post',
    //     data: {
    //         storeId : "",
    //         orderId : "2",
    //         deliveryId : ""
    //     }
    // })
    // .then(function a(response) { 
    //     console.log(response) 
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
})

app.use(express.static(path.join(__dirname, 'public')));