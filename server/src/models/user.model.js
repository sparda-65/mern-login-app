const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
      },
      email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true,
        minlength: 6
      },
      password: {
        type: String,
        required: true,
        minlength: 8
      },
    }, 
    {
      timestamps: true,
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }

const User = mongoose.model('User', UserSchema);

module.exports = User;