const express=require("express");
const bodyParser=require('body-parser');
const app = express();
const multer  =   require('multer');
const jwt = require('jsonwebtoken');

const getUserController=require('./User');
const ItemController=require('./Items');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let upload = multer({dest: 'uploads/'})

function checkToken(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
        let decodeToken = jwt.verify(token, 'secret');
        if (decodeToken.data && decodeToken.data.id) {
            return next();
        }
        res.status(401);
        res.send("not authorised");
    }
    else{
        res.send("Problem with token");
    }

}
app.use(express.json({limit: '50mb'}));
app.get('/api/items',ItemController.getItemsList);
app.post('/api/items/:id/images',checkToken, upload.single('file'),ItemController.uploadItemImage);
app.post('/api/register',getUserController.register);
app.post('/api/login',getUserController.login);
app.get('/api/:id',checkToken,getUserController.getUser);
app.delete('/api/items/:id',checkToken,ItemController.deleteItem);
app.get('/api/items/:id',checkToken,ItemController.getItem);
app.post('/api/items',ItemController.insertItems);
app.put('/api/items/:id',checkToken,ItemController.updateItems);

app.listen(3000);
module.exports.app = app;
