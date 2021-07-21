const _ = require("lodash");
const i18n = require("i18n");

const Controller = require("../Base/Controller");
const Users = require('./Schema').Users;
const CommonService = require("../../services/Common");
const globalObj = require('../../../configs/Globals');

class UsersController extends Controller {
    constructor() {
        super();
    }


    /********************************************************
   Purpose: user register
   Parameter:
      {
          "emailId":"john@doe.com",
          "password":"john",
          "userName":"deo"
      }
   Return: JSON String
   ********************************************************/
  async register() {
    try {
        // check emailId is exist or not
        let filter = {
            [Op.or]: [{
                "emailId": this.req.body.emailId.toLowerCase()
            }, { "userName": this.req.body.userName }]
        };
        const user = await Users.findOne({ where: filter });
        //if user exist give error
        if (!_.isEmpty(user) && (user.emailId || user.userName)) {
            return this.res.send({ status: 0, message: i18n.__("DUPLICATE_EMAIL_OR_USERNAME") });
        } else {
            let data = this.req.body;
            let isPasswordValid = await (new CommonService()).validatePassword({ password: data['password'] });
            if (isPasswordValid && !isPasswordValid.status) {
                return this.res.send(isPasswordValid)
            }
            let password = await (new CommonService()).ecryptPassword({ password: data['password'] });

            data = { ...data, password: password, role: 'user' };
            data['emailId'] = data['emailId'].toLowerCase();

            // save new user
            const newUserId = await Users.create(data);

            // if empty not save user details and give error message.
            if (_.isEmpty(newUserId)) {
                return this.res.send({ status: 0, message: i18n.__('USER_NOT_SAVED') })
            }
            return this.res.send({ status: 1, message: i18n.__('REGISTRATION_SCUCCESS') });
        }
    } catch (error) {
        console.log("error = ", error);
        this.res.send({ status: 0, message: error });
    }

}

    /********************************************************
    Purpose: Login
    Parameter:
        {
            "emailId":"john@doe.com"
            "password":"123456",
        }
    Return: JSON String
   ********************************************************/
  async login() {
    try {
       
        const user = await Users.findOne({ where: { emailId: this.req.body.emailId.toString().toLowerCase()} });

        if (_.isEmpty(user)) {
            return this.res.send({ status: 0, message: i18n.__("USER_NOT_EXIST") });
        }

        const status = await (new CommonService()).verifyPassword({ password: this.req.body.password, savedPassword: user.password });
        if (!status) {
            return this.res.send({ status: 0, message: i18n.__("INVALID_PASSWORD") });
        }
        const token =await new globalObj().generateToken(user.dataValues.emailId);
        return this.res.send({ status: 1, message: i18n.__("LOGIN_SUCCESS"), access_token: token });
    } catch (error) {
        console.log(error);
        this.res.send({ status: 0, message: i18n.__('SERVER_ERROR') });
    }
}

 /********************************************************
    Purpose: listing
    Method: Get
    Return: JSON String
   ********************************************************/
  async listing() {
    try {
        const user = await Users.findAll();
        return this.res.send({ status: 1, message: i18n.__("SUCCESS"),data:user });
    } catch (error) {
        console.log(error);
        this.res.send({ status: 0, message: i18n.__('SERVER_ERROR') });
    }
}

}
module.exports = UsersController;