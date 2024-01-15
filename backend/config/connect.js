const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // if success, connect to the database using the mongo uri
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected on host:${mongoose.connection.host.cyan}`)
    } catch (error) {
        // else log error
        console.log(error)
    }
}

module.exports = connectDB