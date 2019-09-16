const mongoose = require('mongoose');
const {Schema} = mongoose;

const Exercise = new Schema(
    {
        exercise: {
            type: String,
            required: true,
        },
        duration: {
            type: Number | String,
        },
        sets: {
            type: Number | String,
        }
        reps: {
            type: Number | String,
        }
    },
    {
        timestamps: true
    }
);