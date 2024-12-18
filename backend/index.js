const express = require ("express");
const cors = require("cors");

var path = require('path');

const app = express();

//public directory
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
    origin: "http://localhost:8100"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.use(express.json() );

const db = require("./models");
//------------------------normal use. Doesn´t delete the database data
// db.sequelize.sync()
//     .then(() => {
//         console.log("Base de datos sincronizada!");
//     })
//     .catch((err) => {
//         console.log("Algo falló al sincronizarse con la Base de datos: " + errr.message);
//     });

//-----------In development, you may need to drop existrin tables and re-sync database
 db.sequelize.sync({ force: true }).then ( () => {
    console.log("Drop and re-sync db.");
 });

// simple route
app.get("/", (req, res) => {
    res.json({ message: " Bienvenido al catalogo de libros." });
});

require("./routes/book.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log (`El servidor está corriendo en el puerto ${PORT}.`);
}); 
