const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors  = require("cors");

connectDB();

const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('backend/uploads')); // Serve static files from the 'uploads' folder

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/buyer', require('./routes/buyerRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `backend/uploads/${filename}`;
  res.sendFile(filePath, { root: '.' });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
