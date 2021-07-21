
module.exports = (app, express) => {

    const router = express.Router();

    const UsersController = require('../User/Controller');
    const config = require('../../../configs/configs');
    const Validators = require("./Validator");  
    const  passport = require("passport");


    router.post('/users/register', Validators.userSignupValidator(), Validators.validate, (req, res, next) => {
        const userObj = (new UsersController()).boot(req, res);
        return userObj.register();
    });


    router.post('/users/login', Validators.loginValidator(), Validators.validate, (req, res, next) => {
        const userObj = (new UsersController()).boot(req, res);
        return userObj.login();
    });


    router.get('/users/listing', passport.authenticate('jwt', { session: false }),
     (req, res, next) => {
        const userObj = (new UsersController()).boot(req, res);
        return userObj.listing();
    });

  

    app.use(config.baseApiUrl, router);
}