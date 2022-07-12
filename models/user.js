const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, '名稱尚未填寫']
        },
        username: {
            type: String,
            required: [true, '帳號尚未填寫']
        },
        password: {
            type: String,
            required: [true, '密碼尚未填寫']
        },
        tokens: [{
            token: {
                type: String,
                required: true
            },
            expiredAt: {
                type: Date,
                required: true
            }
        }],
        role: {
            type: String,
            default: 'user',
        },
        sex: {
            type: String,
            default: '無性別',
        },
        photo: {
            type: String,
            default: 'photo',
        },
        followings: [{
            type: mongoose.Schema.ObjectId,
            ref: "following",
        }],
        likePosts:[{
            type: mongoose.Schema.ObjectId,
            ref: "Post",
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

const userModel = mongoose.model('user', userSchema);



module.exports = userModel