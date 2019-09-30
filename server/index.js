require('dotenv').config();

const app= require('./src/app');

const port = process.env.PORT || 5000;

// listen to the port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});