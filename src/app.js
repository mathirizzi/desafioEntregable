const express = require("express");

//-------------------------SERVIDOR------------------------------//
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/saludo", (req, res) => {
  res.send("Hola a todos, pero desde express");
});

app.listen(8080, () => console.log("Servidor arriba en el puerto 8080"));



//-------------------------PRODUCT MANAGER-----------------------------//

const ProductManager = require("./ProductManager");

const products = new ProductManager("products.json");

//--------------------GET PRODUCTS:--------------------//

products.readFileProducts().then((datos) => {
  app.get("/products", (req, res) => {
    const limit = parseInt(req.query.limit) || 10;

    const productsLimit = datos.slice(0, limit);

    res.send({ datos: productsLimit });
  });
});

//--------------------GET PRODUCTS BY ID:--------------------//
products.readFileProducts().then((datos) => {
  app.get("/products/:pid", (req, res) => {
    const { pid } = req.params;
    const datosId = datos.find((prod) => prod.id === Number(pid));

    res.send(datosId);
  });
});
//--------------------Agregando productos:--------------------//
/*
async function addingProduct(
  title,
  description,
  price,
  thumbnail,
  stock,
  code
) {
    products.addProduct({
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      stock: stock,
      code: code,
    })
  ;
}

addingProduct("helado", "crema helada", 2500, "imagen", 100, "A1");
*/
