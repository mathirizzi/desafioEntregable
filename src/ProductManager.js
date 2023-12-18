const fs = require("node:fs");
class ProductManager {
  constructor(productsFile) {
    this.path = productsFile;
  }

  //----------Para leer archivo json.----------//

  async readFileProducts() {
    try {
      const productsData = await fs.promises.readFile(this.path, "utf-8");
      const productsJs = await JSON.parse(productsData);
    return productsJs;
      
    } catch (error) {
      return [];
    }
  }

  //--------------------Para crear un producto nuevo--------------------//

  async addProduct(newProduct) {
    try {
      let productsList = await this.readFileProducts();

      if (productsList.length === 0) {
        productsList.push({ ...newProduct, id: 1 });
      } else {
        productsList.push({ ...newProduct, id: productsList.length + 1 });
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsList, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------Para ver la lista de productos--------------------//

  async getProducts() {
    try {
      let getList = await this.readFileProducts();
      return getList
      
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------Para ver un producto por su ID--------------------//

  async getProductById(pid) {
    try {
      let getList = await this.readFileProducts();
      const result = getList.find((prod) => prod.id === pid);
      if (!result) {
        return console.log("No existe el producto seleccionado");
      }
      return console.log("El producto seleccionado es: ", result);
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------Para actualizar producto llamado a traves de su ID--------------------//

  async updateProduct(pid, update) {
    try {
      let getList = await this.readFileProducts();
      let result = getList.findIndex((prod) => prod.id === pid);
      if (!result) {
        return console.log("No se encontro el producto que desea actualizar");
      } else {
        getList[result] = update;
      }
      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(getList, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------Para eliminar producto seleccionado a traves de su ID--------------------//
  async deleteProduct(pid) {
    try {
      let getList = await this.readFileProducts();
      let result = getList.findIndex((prod) => prod.id === pid);
      if (!result) {
        return console.log("No se encontro el producto que desea actualizar");
      } else {
        getList.splice(result, 1);
      }
      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(getList, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }



  
}

module.exports = ProductManager;




 //--------------------Ver Lista de productos:--------------------//
    /*
    console.log(products.getProducts())
    */
    //--------------------Ver producto seleccionado segun su ID:--------------------//
    /*
    console.log(products.getProductById(1))
    */
    //--------------------Actualizar producto seleccionado segun su ID:--------------------//
    /*
    console.log(products.updateProduct(4, {
        title: "UPDATE2",
        description: "UPDATE2",
        price: "UPDATE2",
        thumbnail: "UPDATE2",
        stock: "UPDATE2",
        code: "UPDATE2",
    }))
    
    */
    //--------------------Eliminar producto seleccionado segun su ID:--------------------//
    /*
    console.log(products.deleteProduct(3))
    
    */