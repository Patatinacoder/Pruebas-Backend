import fs from "fs"
import express from "express";

const app = express();

class ProductManager {
constructor(path) {
this.path = path || './products.json';
this.products = [];
this.getProducts();
}

async getProducts() {
    try {
        let products = await fs.promises.readFile(this.path, "utf8");
        this.products = JSON.parse(products);
        return this.products;
            } catch (error) {
        console.error(error);
    }
}

async addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
        if (!title || !description || !price || !thumbnail || !code || !stock) throw new Error('All fields are required');
        if (this.products.some(product => product.code == code)) throw new Error("Code already exists.");
        let newProduct = { id: this.addNewId(), title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return newProduct;
    } catch (error) {
        console.error(error);
    }
}

addNewId() {
    return this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
}

async getProductById(id) {
    let product = this.products.find(prod=> prod.id == id);
    if (!product) throw new Error("Product not found.");
    return product;
  }
  async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    try {
        let product = this.products.find(product => product.id == id);
        if (!product) throw new Error("Not found.");
        let duplicate = this.products.find(p => p.code == code && p.id !== id);
        if (duplicate) throw new Error("Code already exists.");
        product.title = title;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.code = code;
        product.stock = stock;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return "Product updated successfully";
    } catch (error) {
        console.error(error);
    }
}

async deleteProduct(id) {
    try {
        let index = this.products.findIndex(product => product.id ===id);
        if (index === -1) throw new Error("Product not found.");
        this.products.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return "Product deleted successfully";
    
    }catch(error){
        console.error(error);
    }
}
}

export default ProductManager;