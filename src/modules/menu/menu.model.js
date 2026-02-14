const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_sales: {
        type: Number,
        default: 0,
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;

// Data 
// {
//     "name": "Alice",
//     "price": 10,
//     "taste": "Sweet",
//     "is_drink": false,
//     "ingredients": ["Sugar", "Milk"],
//     "num_sales": 5
// }