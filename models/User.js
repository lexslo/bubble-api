const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: 'Username is required',
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    // Array of _id values referencing the Thought model
    thoughts: [ThoughtSchema],
    // Array of _id values referencing the User model (self-reference)
    friends: [UserSchema]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});

// Create a virtual friendCount: retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;