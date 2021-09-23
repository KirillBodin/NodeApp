let connection = require('./config');
const multer  =   require('multer');

module.exports.getItemsList=function(req,res) {
    connection.query('SELECT * FROM items', function (error, results, fields) {
        if (error) {
            res.status(403);
        } else {
            res.status(200);
            res.send({data: results});
        }
    });
}

module.exports.getItem=function(req,res) {
    let id = req.params.id;
    connection.query(`SELECT * FROM items WHERE id_item=${id}`, function (error, results, fields) {
        if (error) {
            res.status(403);
        } else {
            res.json({
                data: results,
            })
        }
    });
}


module.exports.updateItems=function(req,res) {
    connection.query(`UPDATE items SET title='${req.body.title}',price=${req.body.price} WHERE id_item=${req.params.id}`, function (error, results, fields) {
        if (error) {
            res.status(403);
        } else {
            if(req.body.title.length<3){
                res.status(422);
                res.json({
                    message:"Title should contain at least 3 characters"
                })
            }
            else if(!!req.params.id) {
                res.status(404);
            }
            else{res.status(200);
            }
        }
    });
}

module.exports.insertItems=function(req,res) {
    let title = req.body.title;
    let price = req.body.price;
    connection.query(`INSERT INTO items (title,price) VALUES ('${title}',${price})`, function (err, result) {
        if (err) {
            res.status(404);
            res.send({err});
        }
        else {
            if(!req.body.title) {
                res.status(422);
                res.json({
                    field:"title",
                    message:"Title is required"
                })
            }
            else{
                res.status(200);
                res.json({
                    result
            })
            }
        }
    });
}

module.exports.deleteItem=function(req,res) {
    let id_item = req.params.id;
    connection.query(`DELETE FROM items WHERE id_item=${id_item}`, function (error, results, fields) {
        if (error) {
            res.status(403);
        } else {
            if(!!req.params.id) {
                res.status(404);
                res.json({
                })
            }
            else{res.status(200);
            }
        }
    });
}

module.exports.uploadItemImage=function(req,res) {
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, `${__dirname}/uploads`);
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname);
        }
    });
    if (!req.file) {
        res.status(400);
        return res.end("file is not provided")
    }
    const filePath = "http://localhost:3000/" + req.file.destination + req.file.filename;
    connection.query(`UPDATE items SET image='${filePath}' WHERE id_item=${req.params.id}`, function (err, result) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).send('OK');
        }
    });
}
