let connection = require('./config');
const Cryptr = require('cryptr');
const jwt = require('jsonwebtoken');
cryptr = new Cryptr('myTotalySecretKey');

module.exports.getUser=function(req,res){
    connection.query(`SELECT * FROM users WHERE id=${req.params.id}`, function (error, results, fields) {
        if (error) {
            res.status(404);
        }else{
            res.status(200);
            res.json({
                data:results,
            })
        }
    });
}


module.exports.login=function(req,res){
    let email=req.body.email;
    let password=req.body.password;
    connection.query(`SELECT * FROM users WHERE email = '${email}'`, function (error, results, fields) {

        if (error) {
            res.json({
                status:false,
                error: error
            })
        }else{
            if(results.length >0){
                let decryptedString = cryptr.decrypt(results[0].password);
                if(password===decryptedString){
                    let token = jwt.sign({
                        data:{id:results[0].id}
                    }, 'secret', { expiresIn: '1h' });
                    res.status(200).send({token});
                }else{
                    res.status(422);
                    res.json({
                        field:"password",
                        message:"Wrong email or password"
                    });
                }
            }
            else{
                res.status(422);
                res.json({
                    field:"email",
                    message:"Wrong email or password"
                });
            }
        }
    });
}

module.exports.register=function(req,res) {
    let encryptedString = cryptr.encrypt(req.body.password);
    let users = {
        "name": req.body.name,
        "email": req.body.email,
        "password": encryptedString,

    }
    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            res.status(422);
            res.json({
                field: "password",
                message: 'Wrong current password;',
                error,
            })
        } else {
            res.status(200);
            res.json({
                password: encryptedString,
            })
        }

    });
}