const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    phoneNumber : {
        type : String,
        required : [true, 'Please add Phone Number'],
        unique : 'true',
        trim : 'true'
    },
    otp: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['Candidate', 'Employer'],
        default: 'Candidate'
    },
    password : {
        type:'String',
        require: [true, 'Please add Password'],
        min:6,
        max:32,
    },
    
      
},
{timestamps: true}
);

module.exports = mongoose.model('User',userSchema)