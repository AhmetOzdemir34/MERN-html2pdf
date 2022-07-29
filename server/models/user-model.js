const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        lowercase:true,
        trim:true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim:true
    },
    gender: {
        type: mongoose.Schema.Types.String,
        enum: ["male","female"],
        default: "male",
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }],
});

userModel.virtual('count')
.get(function() {
    return this.documents.length;
});


userModel.set('toObject', { virtuals: true })
userModel.set('toJSON', { virtuals: true })


module.exports = mongoose.model('User', userModel, 'users'); 