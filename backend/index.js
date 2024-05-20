const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect("mongodb+srv://jerrywalker363:PiMzgBnNGLufzQzj@cluster0.cm2rdxp.mongodb.net/<YOUR_DATABASE_NAME>", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: String,
  tagName: String
});

// Create User model
const User = mongoose.model('User', userSchema);

// Update the login route to return user information along with the token
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If user exists, generate token
    const token = generateToken(); // Implement your token generation logic here

    // Return token and user information
    res.json({ token, fullName: user.fullName });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Login Error' });
  }
});

  

// Signup route
app.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    
    // Return success message
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Signup Error' });
  }
});

const Task = require('./task');

// Add task route
app.post('/addTask', async (req, res) => {
    const { title, description, date, time } = req.body;
    
    try {
      // Create new task
      const newTask = new Task({ title, description, date, time });
      await newTask.save();
      
      // Return success message
      res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
      console.error('Add Task Error:', error);
      res.status(500).json({ message: 'Add Task Error' });
    }
});

// Fetch tasks route without timeout
app.get('/tasks', async (req, res) => {
    try {
        // Find all tasks
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Fetch Tasks Error:', error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

  
// Update Profile route
app.post('/updateProfile', async (req, res) => {
    const { fullName, email, tagName } = req.body;
  
    try {
        // Find the user by email
        const user = await User.findOne({ email });
    
        // If user does not exist, return error
        if (!user) {
            console.error('User not found for email:', email);
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Update user information
        user.fullName = fullName;
        user.email = email;
        user.tagName = tagName;
    
        // Save updated user
        await user.save();
    
        // Return success message
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
});

// Fetch user profile route
app.get('/getUserProfile', async (req, res) => {
  try {
    // Assuming you have the user's username stored in the query parameters
    const userName = req.query.userName; // Access username from query parameters
    
    // Find the user profile information based on the username
    const userProfile = await User.findOne({ fullName: userName });
    
    // Check if the user profile exists
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    
    // If user profile exists, send it back to the client
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});


// Change Password route
app.post('/changePassword', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    
    try {
        // Find the user by email
        const user = await User.findOne({ email });
    
        // If user does not exist, return error
        if (!user) {
            console.error('User not found for email:', email);
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if the current password matches
        if (user.password !== currentPassword) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
    
        // Update user's password
        user.password = newPassword;
        await user.save();
    
        // Return success message
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Change Password Error:', error);
        res.status(500).json({ message: 'Failed to update password' });
    }
});


  
  

// Token generation function (example)
function generateToken() {
  // Implement your token generation logic here
  return 'dummy_token';
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
