import { Router } from "express";
import Food from "../models/food.js";

const router = Router();

router.put('/updateFoodAvailability/:foodId', (req, res) => {
    const { foodId } = req.params;

    Food.findById(foodId)
        .then((food) => {
            if (!food) {
                return res.status(404).json({ message: 'Food item not found' });
            }

            // Modify the availability status to false
            food.available = false;
            return food.save();
        })
        .then((updatedFood) => {
            res.json({ message: 'Availability status updated successfully', updatedFood });
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error updating availability status', error: err.message });
        });
});

router.get("/allfoods", async (req, res) => {
    try {
        const allFood = await Food.find();
        res.status(200).json(allFood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
