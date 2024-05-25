const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [wishlistItemSchema]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
