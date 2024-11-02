import { Router } from "express";

import Food from "../models/food.js";
import User from "../models/user.js";

const router = Router();

router.get("/getemails", async (req, res) => {
    try {
      const userEmails = await User.find({}, { email: 1, _id: 0 }).lean(); // Fetching only the email field
  
      res.status(200).json(userEmails);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
});

// Route to handle food donation form submission
router.post("/fooddonation", async (req, res) => {
    try {
        const { foodName, foodTag, quantity, expiryDate, address, email } = req.body;

        const user = await User.findOne({ email });

        // Save the form data to the database

        const food = await Food.create({
            foodName,
            quantity,
            expiryDate,
            address,
            foodTag,
            user: user._id,
        });

        await food.save();
        user.food.push(food._id);

        res.status(201).json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
