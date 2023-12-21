// Desafio 3 //

const express = require('express');
const ProductManager = require('./product-manager');

// Crea una instancia de Express
const app = express();

// Define el puerto en el que el servidor escuchará
const PUERTO = 8080;

// Crea una instancia de ProductManager
const productManager = new ProductManager('./productos.json'); 

// Habilita el uso de JSON en las solicitudes
app.use(express.json());

// Endpoint para obtener todos los productos con posibilidad de limitar resultados
app.get('/products', async (req, res) => {
  const products = await productManager.getProducts();
  const limit = parseInt(req.query.limit);

  if (limit > 0) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

// Endpoint para obtener todos los productos con posibilidad de limitar resultados
app.get('/products', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      console.log("Products in /products:", products);
  
      const limit = parseInt(req.query.limit);
  
      if (limit > 0) {
        res.json(products.slice(0, limit));
      } else {
        res.json(products);
      }
    } catch (error) {
      console.error("Error in /products:", error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

// Inicia el servidor y escucha en el puerto especificado
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

  
