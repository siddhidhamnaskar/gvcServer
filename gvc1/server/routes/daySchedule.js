const express=require('express');

const router=express.Router();
const setup=require('../day_shedule')

router.get('/',setup);

module.exports=router