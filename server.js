require('dotenv').config();
const app = require('./app');
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB(); // wait for DB
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await require('mongoose').connection.close();
  process.exit(0);
});

// connectDB();
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
