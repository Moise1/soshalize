import User from '../models/User';

class UserController {

    static async Signup(req, res){

        const {username, password, email} = req.body;

        const userData = await new User({
            username,
            password,
            email
        });

        await userData.save(err =>{
            if(err) console.log(err);
            res.status(201).json(userData);
        });
        
    }
}

export default UserController;