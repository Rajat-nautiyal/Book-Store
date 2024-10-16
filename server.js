const express = require('express');
const connectDB = require('./config/db');
const comicRoutes = require('./routes/comicRoutes.js');

connectDB(); //it connects to Mongodb database 

const app = express();
app.use(express.json()); //to parse data(coming from body) in json

app.use('/api', comicRoutes); //route for GET,POST PUT,DELETE requests for comics

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
