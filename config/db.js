const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async() => {
    try {
        console.log("MongoDB URL:", process.env.MONGO_URL);  // Log this to verify the URL
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongodb Connected ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`Mongodb Server Issue ${error}`.bgRed.white);
    }
}

module.exports = connectDB;
