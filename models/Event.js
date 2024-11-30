import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Address schema definition
const addressSchema = new Schema({
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        minLength: [5, 'Length of Address must be 5 characters or longer'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        minLength: [2, 'Length of city must be 2 characters or longer'],
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        uppercase: true,
        minLength: [2, 'Required 2 character state abbreviation'],
        maxLength: [2, 'Required 2 character state abbreviation'],
    },
    zip: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
        minLength: [5, 'Zip code should be 5 digits long'],
        maxLength: [5, 'Zip code should be 5 digits long'],
    },
    // country: {
    //     type: String,
    //     required: [true, 'Country is required'],
    //     trim: true,
    //     minLength: [2, 'Length of country must be 2 characters or longer'],
    // },
    formatted: {
        type: String,
    },
},
    { _id: false }
);

// Event schema definition
const eventSchema = new Schema(
    {
        title: {
            type: String,
            require: [true, 'Title is required'],
            minLength: [2, 'Length of title must be 2 characters or longer'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minLength: [5, 'Length of description must be 5 characters or longer'],
            trim: true,
        },
        eventDate: {
            type: Date,
            required: [true, 'Event date is required'],
            validate: {
                validator: (date) => date > Date.now(),
                message: 'Event date must be in the future',
            },
        },
        place: {
            type: addressSchema,
            required: [true, 'Event location is required'],
        },
        requiredVolunteer: {
            type: Number,
            required: [true, 'Number of volunteers needed cannot be negative'],
            min: 0,
        },
    },
    { timestamps: true }
);

addressSchema.pre('save', function (next) {
    this.formatted = `${this.address}, ${this.city}, ${this.state}, ${this.zip}`;
    next();
});

export const Event = model('Event', eventSchema);

export default Event;