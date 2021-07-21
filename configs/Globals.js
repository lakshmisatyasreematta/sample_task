/****************************
 SECURITY TOKEN HANDLING
 ****************************/
let jwt = require('jsonwebtoken');
const config = require('./configs');
class Globals {
    generateToken(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let token = jwt.sign({
                    id: id,
                    algorithm: "HS256",
                    exp: Math.floor(Date.now() / 1000) + parseInt(config.tokenExpiry)
                }, config.securityToken);

                return resolve(token);
            } catch (err) {
                console.log("Get token", err);
                return reject({ message: err, status: 0 });
            }

        });
    }

}

module.exports = Globals;
