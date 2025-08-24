import foodModel from "../models/foodModel.js";
import fs from 'fs';



// add food item

const addFood = async (req, res) => {
    console.log('BODY:', req.body);
// console.log('PRICE:', req.body.price, typeof req.body.price);


    let image_filename = req.file ? req.file.filename : null;

    const food =  new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

//     const { name, description, price, category } = req.body;
// let image_filename = req.file ? req.file.filename : null;

// if (!name || !description || price === undefined || !category) {
//     return res.status(400).json({ success: false, message: "All fields required." });
// }

// const parsedPrice = Number(price);
// if (isNaN(parsedPrice)) {
//     return res.status(400).json({ success: false, message: "Price must be a valid number." });
// }

// const food = new foodModel({
//     name: name.trim(),
//     description: description.trim(),
//     price: parsedPrice,  // Always store as number
//     category: category.trim(),
//     image: image_filename
// });

    try {
        await food.save();
        res.json({success: true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:"Error"})
    } 
}

// all food list
const listFood =async (req,res) =>{
    try {
        const food = await foodModel.find({});
        res.json({success: true,data:food})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"})
    }
}

//remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}


export { addFood,listFood, removeFood };
