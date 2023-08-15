const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    car: {
        type: String,
        required: true,
    },

    itineraire: {
        type: String,
        required: true,
    }, 

    phone: {
        type: Number,
    },

    participation: {
        type: String,
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

module.exports = Post = model ("post", userSchema);
