const mongoose = require('mongoose');
const { date } = require('@hapi/joi');

const {Schema} = mongoose;

const PopSchema = Schema({
    popname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
      },
      zone: {
        type: String,
        required: false,
        index: true,
        trim: true,
        minlength: 3
      },
      ville: {
        type: String,
        required: false,
        minlength: 4
      },
      createat:{
          type:Date,
      },
      createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    }, 
    {
      timestamps: true,
});


const Pop = mongoose.model('Pop', PopSchema);

module.exports = Pop;