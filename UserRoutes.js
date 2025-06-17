
// importing needed dependencies and files
import express from "express"
import User from "./User.js"
 

const router = express.Router();   // router in express helps to handle paths

//GET/users–Fetch all users from the MongoDB collection.

router.get('/users', async (req, res) => {  // async operations 
    // try and catch method 
    // find() -- to get all data from collection
    try {
        const users = await User.find();
        res.json(users);
        // error message
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 2) GET/users/– Fetch details of a specific user by MongoDB ObjectId.
router.get('/users/:id', async (req, res) => {
    // try and catch method to get data using id
    try {
        const user = await User.findById(req.params.id);
    //   if id is wrong-error statement
        if (!user) {
            return res.status(404).json({ error: "User not found🤔. Check ID !!!" })
        };
        // if the id exist return that user
        res.json(user);
        // common error statement 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 3) POST/user–Add a new user and save it in MongoDB.
router.post('/user', async (req, res) => {
    // try and catch method
    try {
        const newUser = new User(req.body);
        await newUser.save();
        // successfull response
        res.status(201).json(newUser);
    } catch (err) {
        // error response
        res.status(400).json({ error: err.message });
    }
});


// 4) PUT/user/– Update details of an existing user.
router.put('/user/:id', async (req, res) => {
    try {
        // finout id
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found 🤔" })
        };

        // Manually update fields
        if (req.body.name !== undefined){
            user.name = req.body.name;
        } 
        if (req.body.email !== undefined) {
            user.email = req.body.email
        };
        if (req.body.age !== undefined) {
            user.age = req.body.age
        };
        if (req.body.isActive !== undefined) {
            user.isActive = req.body.isActive
        };

        // Save the updated user
        const updatedUser = await user.save();
        res.json(updatedUser);

    } 
    // error message
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//5) DELETE/user/– Delete a user by MongoDB ObjectId.

router.delete('/user/:id', async (req, res) => {
    // try and catch method
    try {
        // user Id found
        const user = await User.findById(req.params.id);

        // if the user not exist in dbs
        if (!user) {
            return res.status(404).json({ error: "User not found .Kindly enter correct user ID.🤔" })
        };

        await user.deleteOne(); //remove that user from dbs
        res.json({ message: "User deleted successfully 🎯" });

    } 
    // common error message
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});




export default router;




