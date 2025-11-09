const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    claimantName: {
        type: String,
        required: true
    },
    claimantPhone: {
        type: String,
        required: true
    },
    claimantEmail: {
        type: String,
        required: true
    },
    claimDescription: {
        type: String,
        required: true
    },
    itemOwnerPhone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    meetingPlace: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Claim', ClaimSchema);
