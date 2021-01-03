const mongoose = require ('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URL, options);

mongoose.connection.on('error', console.error.bind(console, 'Database connection error.'));

module.exports = mongoose;