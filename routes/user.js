const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {login, signup} = require("../controller/Auth");
const {auth,isStudent, isAdmin} = require("../middlewares/auth");

router.post("/login",login);
router.post("/signup",signup);

//testing protected route for single middleware
router.get("/test",auth,(req,res) =>{
    res.json({
        success:true,
        message:"welcome to the protected route for TESTS",
    });
});

// protected route
router.get("/student",auth,isStudent, (req, res) =>{
    res.json({
        success:true,
        message:"welcome to the protected route for student",
    });
});

router.get("/admin", auth, isAdmin, (req,res) =>{
    res.json({
        success:true,
        message:"welcome to the protected route for admin",
    });
});

// Fixed getEmail route
// router.get("/getEmail", auth, async (req, res) => {
//     try {
//         const id = req.user.id;
//         console.log("ID:", id);
//         // Changed findOne query to use _id instead of id
//         const user = await User.findById(id);
        
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             user: user,
//             message: "Welcome to the email route"
//         });
//     } catch(error) {
//         res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Internal server error"
//         });
//     }
// });  

module.exports = router;