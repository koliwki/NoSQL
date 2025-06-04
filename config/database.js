const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB connecté: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Erreur: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

module.exports = connectDB;
