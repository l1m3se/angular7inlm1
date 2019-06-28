const route = require('express').Router();

const authorization = require('../auth/auth.js');
const users = require('../controllers/userController.js');

// unrestricted routes
route.post("/register", users.register);
route.post("/login", users.login);

// restricted routes
route.get("/all", authorization, users.getUsers);       
route.get("/:id", authorization, users.getUser);        
route.put("/:id", authorization, users.updateUser);                         // Update user details
route.put("/updatepass/:id", authorization, users.updatePassword);          // Update user password
route.put("/updateemail/:id", authorization, users.updateEmail);            // Update user email
route.delete("/:id", authorization, users.deleteUser);  


module.exports = route;