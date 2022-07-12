const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const cachegoose = require('cachegoose');
const userModel = require('../models/user');

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    cachegoose(mongoose, {
        engine: 'redis',    
        client: require('redis').createClient('redis://localhost:6379')
      });

    
    var  parentId ='redis-cache-1';
    userModel.findById(id).populate({
        path: 'followings',
        select: '_id user whoFollow createdAt updateAt',
        populate: {
          path: 'user',
          select: 'name photo'
        }
      }).populate({
        path: 'likePosts',
        select: '_id user image content createdAt updateAt',
        populate: {
          path: 'user',
          select: 'name photo'
        }
      }).cache(30, `${ parentId }_children`) // cache(過期秒數, key名稱)
      .exec(function (err, datas) {
        if (datas) {
          res.status(200).json({
            status: 'success',
            datas,
          });
        } else {
          res.status(400).json({
            status: 'false',
            message: "欄位未填寫正確，或無此 ID",
          });
        }
      });
})


module.exports = router