const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;

// Create and Save a new Libro
exports.create = (req, res) => {    
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: " Debe especificar el titulo del libro"
        });
        return;
    }

    // Creación del Libro
    const book = {
        title: req.body.title,
        author: req.body.author,
        filename: req.file ? req.file.filename : ""
    };

    // Guaradamos en la base de datos
    Book.create(book)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
              err.message || "Algo ocurrió mientras se creaba el libro."
        });
    });
};

// Retrive all Books from the database
exports.findAll = (req, res) => { 
    const title = req.query.title;
    var condition = title ? { title: {[Op.like]: `%${title}%` } } : null;

    Book.findAll({ where: condition })
     .then(data => {
        console.log(data);
        res.send(data);
     })   
     .catch(err => {
        console.log("Llegamos al catch",err);
        res.status(500).send({
            message:
              err.message || "Algo ocurrió mientras recibíamos los libros."
        });
     });
};

// Find a single Libro with an id
exports.findOne = (req, res) => {  
    const id = req.params.id;
    
    Book.findByPk(id)
     .then (data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `No se ha encontrado el Libro con id=${id}`
            });
        }
     })
     .catch ( err => {
        res.status(500).send({
            message: `Oh! Oh! algo ocurrió al intentar recuperar el Libro con id=${id}`
        });
     });
};

// Update an Libro by the id in the request
exports.update = (req, res) => {  
    const id = req.params.id;

    Book.update (req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            res.send ({
               message: "Libro actualizado satisfactoriamente." 
            });
        } else {
            console.log("error en el else ");
            console.log("num = ", num);
            console.log("req.body ",req.body);
            res.send ({
               message: `No se pudo actualizar el libro con id = ${id}. Quizás el libro no fue encontrado o req.body esta vacio!`
            });
        }
      })
      .catch (err => {
          console.log("error: ",err);
          res.status(500).send({
            message: `Oh! Oh! algo ocurrió al intentar actualizar el Libro con id=${id}`
          });
      });
};

// Delete an Libro with the specified id in the request
exports.delete = (req, res) => {  
    const id = req.params.id;
    
    Book.destroy({
        where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
            message: "Libro eliminado satisfactoriamente."
        });
      } else {
        res.send({
            message: `Oh! Oh! algo ocurrió al intentar eliminar el Libro con id=${id}`
        });
      }
    })
    .catch(err => {
        res.status(500).send({
          message: `Oh! Oh! algo ocurrió al intentar eliminar el Libro con id=${id}`
        });
    });
};

// Delete all Libros from the database
exports.deleteAll = (req, res) => {  
    Book.destroy({
     where: {},
     truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Libros fueron eliminados satisfactoriamente.`});
    })
    .catch(err => {
        res.status(500).send({
            message: "Oh! Oh! algo ocurrió al intentar eliminar todos los Libros."
          });
    });
};