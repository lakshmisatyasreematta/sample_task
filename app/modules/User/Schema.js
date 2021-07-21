const _ = require('lodash');
const config = require('../../../configs/configs');

let Users = sequelizeConnection.define('Users', {
    userName: { type: DataTypes.STRING },
    emailId: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
}, {
        freezeTableName: true,
        paranoid: true
    });


module.exports = {
    Users
}