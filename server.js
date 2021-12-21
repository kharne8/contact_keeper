const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
//Connect MongoDb
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//static assets
if (process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
console.log('test');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
