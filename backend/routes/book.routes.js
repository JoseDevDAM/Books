module.exports = app => {
    const books = require("../controllers/book.controller.js");
    var upload = require('../multer/upload.js');

    var router = require("express").Router();

    // Creación de un nuevo libro
    router.post("/", upload.single('file'), books.create);

    // Recuperar todos los libros
    router.get("/", books.findAll); 

    // Recuperar un libros por su id
    router.get("/:id", books.findOne);

    // Actualizamos un libros por su id
    router.put("/:id", books.update);

    // Eliminamos un libros
    router.delete ("/:id", books.delete);

    // Eliminamos todos los libros
    router.delete("/", books.deleteAll);    

    app.use('/api/books', router);
};