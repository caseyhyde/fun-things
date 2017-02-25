var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;
var thingSchema = new Schema({
    user_id: {
      type: ObjectId
    },
    description: {
        type: String,
        required: true
    },
    long_description: {
        type: String
    },
    link: {
        type: String
    },
    up_count: {
        type: Number,
        default: 0
    },
    down_count: {
        type: Number,
        default: 0
    },
    approved: {
        type: Boolean,
        default: true
    }
});

// user model
var Trip = mongoose.model('thing', thingSchema);

// Export model
module.exports = Thing;
