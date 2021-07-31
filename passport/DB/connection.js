import Mongoose from 'mongoose';

const connection = await Mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

Mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in:', process.env.MONGO_URL);
});

Mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

export default connection;