const express = require("express");

const router = express.Router();
const users = require("../models/user");

//register users routes
router.post("/register", async (req, res) => {
  console.log(req.body);

  const { name, email, age, mobile, work, address, desc } = req.body;

  if (!name.trim() || !email.trim() || !age.trim() || !mobile.trim() || !work.trim() || !address.trim() || !desc.trim()) {
    return res.status(400).json({ message: "please fill all the fields" });
  }
  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      const newUser = new users({
        name: name,
        email: email,
        age: age,
        mobile: mobile,
        work: work,
        address: address,
        desc: desc,
      });
      await newUser.save();
      res.status(200).json({ message: "user registration successful" });
    }
  } catch (error) {
    console.log(error);
  }
});


//get user data

router.get('/getusers',async function(req, res) {
    try {
        const userdata = await users.find();
        console.log(userdata);
        res.status(200).json(userdata);
    }
    catch (error) {
            console.log(error);
        }
    // const users = await users.find();
});


router.get('/getuser/:id',async (req, res) => {
  try{
    const id = req.params.id;
  console.log(id);

  const userdata = await users.findById({_id:id});

  console.log(userdata);
  res.status(201).json(userdata);
  }
  catch (error) {
      // console.log(error);
      res.status(422).json({ message: "user not found" });
    }
  
})


//update user

router.patch('/updateuser/:id', async (req, res)=>{
  try{
    const id = req.params.id;

   const updatedUser = await users.findByIdAndUpdate(id, req.body,{
    new: true
   });
   console.log(updatedUser);
   res.status(201).json(updatedUser);

  }
  catch (error) {
        // console.log(error);
        res.status(422).json({ message: "user not found" });
      }
}
  
)


//delete user

router.delete('/deleteuser/:id', async (req, res)=>{
  try{
    const id = req.params.id;

    const deletedUser = await users.findByIdAndDelete(id);
    console.log(deletedUser);
    res.status(201).json(deletedUser);

  }
  catch (error) {
        // console.log(error);
        res.status(422).json({ message: "user not found" });
      }
}
  
)
module.exports = router;
