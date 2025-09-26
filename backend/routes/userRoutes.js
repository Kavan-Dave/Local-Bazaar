const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticated = require('../middleware/authenticated');
const roleCheck = require('../middleware/roleCheck');
const SECRET = 'AT_LOCAL';

// Get all users
router.get('/',authenticated,roleCheck('admin'), async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by ID
router.get('/me',authenticated, async (req, res) => {
    try {
        const id =req.user.userId;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
});
//for admin view only
router.get('/:id',authenticated,roleCheck('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
});

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a user
router.put('/me',authenticated, async (req, res) => {
    try {
        const id =req.user.userId;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a user
router.delete('/:id',authenticated,roleCheck('admin'), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    console.log("inside function");
    return res.status(400).json({ error: 'Email and password are required' });
  }
  next();
}

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});

        if(!user)
        {
            console.log("No user found!");
            return res.status(400).json({error : 'Incorrect Email'});
        } 
        console.log(user.password);
        const passCheck = await bcrypt.compare(password,user.password);
        if(!passCheck)
            return res.status(400).json({error : 'Password Incorrect'});
        const token = jwt.sign( /*this creates the token which will be stored in client machine. */
            { userId: user._id, role: user.role },
            SECRET,
            { expiresIn: '1d' } /*this is the hte time for which the token is stored on the machine. */);
        res.json({ token });

    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).json({error : err.message});
    }
});

module.exports = router;
