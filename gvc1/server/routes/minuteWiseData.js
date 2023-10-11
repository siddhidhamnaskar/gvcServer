const express=require('express');

const router=express.Router();
const { sequelize,MinuteData}=require('../models');



const StoreData = async(req,res) =>{
    try {
        const { running, cash,vended } = req.body;
        // console.log(req.body);
        // Create a new user in the database
        const record = await MinuteData.create({machines_running:running,cashCollected:cash,items_vend:vended});
        console.log(record);
        res.status(201).json(record);
      } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Internal server error' });
      }
       
    
}



router.post('/',StoreData);




module.exports=router