const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist'));

// app.get('/*', (req, res) => {
//     // res.sendFile(path.join(__dirname, '/dist/myapp/index.html'));
//     res.sendFile(path.join(__dirname+'/dist/myapp/index.html'));
// })

app.get('/*all', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Server started');
});