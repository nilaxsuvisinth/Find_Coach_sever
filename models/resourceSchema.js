const mongoose = require('mongoose');

const resourceSchema =mongoose.Schema({

        name: {
            type: String,
            required: true
        },
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:"Users",
            required:true
        }
        ,
        address: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
       
        currentEmployment : {
            type: String,
            required: true
        },
        yearOfExperience: {
            type: String,
            required: true
        },
        courseName: {
            type: String,
            required: true
        },
        courseDescription: {
            type: String,
            required: true
        },
        courseDuration: {
            type: String,
            required: true
        },
        courseFees: {
            type: Number,
            required: true
        }, 
        category: {
            type: String,
            default: 'All',
            required: true
        },
        verified:{
            type:Boolean,
            default:false
        },
        // sessions: [
        //     {
        //         type: {
        //             type: String,
        //             enum: ['group', 'personal'],
        //             required: true
        //         },
        //         day: {
        //             type: String,
        //             enum: ['weekday', 'weekend'],
        //             required: true
        //         },
        //         time: {
        //             start: {
        //                 type: String,
        //                 required: true
        //             },
        //             end: {
        //                 type: String,
        //                 required: true
        //             }
        //         }
        //     }
        // ], 
        // image: {
        //     url: String,
        //     public_id: String
        // },   

    timestamps: {
        type: Date,
        default: Date.now
    }
});

// resourceSchema.statics.uploadImage = async function (file) {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(file, (result) => {
//         if (result.error) {
//           return reject(result.error);
//         }
//         resolve({ url: result.secure_url, public_id: result.public_id });
//       });
//     });
//   };
  

// Create Model
const Resource =mongoose.model("RESOURCE", resourceSchema);

module.exports = Resource;