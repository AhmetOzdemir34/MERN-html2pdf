const mongoose = require('mongoose');

const documentModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sha256: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        mutable:false
    }
});



module.exports = mongoose.model('Document', documentModel, 'documents');