/*!
Author: Mario Posada
Author URI: 
Description: Carrito de compras para el curso de JavaScript en Coderhouse
Version: 1.0.0
License: GNU General Public License v2 or later

*/
/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
# Variables
# LocalStorage
# Clases
# Objetos

----------------------------------------------------------------------*/
/*--------------------------------------------------------------------*/

/*--------------------------- Variables ------------------------------*/

let carritoUser = []
let itemsCarrito = 0;

/*--------------------------- LocalStorage ------------------------------*/


sessionStorage.setItem("itemCarrito", JSON.stringify(itemsCarrito));



/*--------------------------- Clases ------------------------------*/

/*--------------------------- Producto ------------------------------*/
class Producto {
    constructor(id, nombre, precio,cantidad,categoria, url) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.url = url;
        this.vendido = false;
        this.categoria = categoria;
        this.cantidad = cantidad;
    }

    vender() {
        this.vendido = true;
    }
}
/*--------------------------- Carrito ------------------------------*/
class Carrito {
    constructor(id) {
        this.id = id;
        this.productos = [];

    }
    totalProductos() {
        return this.productos.map((it) => it.nombre);
    }

    allProductos() {
        return this.productos;
    }
    agregarItem(articulo) {
        this.productos.push(articulo);
    }
    buscarItem(item) {
        let isTrue = false;
        for (const index of this.productos) {
            if (index.id == item) {
                isTrue = true;
            } 
            return isTrue;
    }
}
    eliminarItem(item) {
        let isTrue = false;
        for (const index of this.productos) {
            if (index.id == item) {
                isTrue = true;
            }
        }
        if (isTrue) {
            this.productos = this.productos.filter((it) => it.id !== item);
            alert("El item se elimino con éxito !")
        } else {
            alert("El producto no existe !")
        }
    }
    vaciarCarrito() {
        return this.productos.splice(1);
        }
    costoTotalCarrito() {
        let valorCarrito = 0;
        for (const index of this.productos) {
            valorCarrito += index.precio
        }
        return valorCarrito

    }
}
/*--------------------------- Tienda ------------------------------*/
class Tienda {
    constructor(id) {
        this.id = id;
        this.productos = [];

    }
    totalProductos() {
        return this.productos.map((it) => it.nombre);
    }
    vaciarCarrito() {
        return this.productos.map((it) => false);
        }

    allProductos() {
        return this.productos;
    }
    buscarItem(item) {
        let isTrue = false;
        for (const index of this.productos) {
            isTrue = index?.id || true;
            if (index.id == item) {
                isTrue = true;
            } 
            return isTrue;
    }
}
    agregarItem(articulo) {
        this.productos.push(articulo);
    }
    eliminarItem(item) {
        let isTrue = false;
        for (const index of this.productos) {
            if (index.id == item) {
                isTrue = true;
            }
        }
        if (isTrue) {
            this.productos = this.productos.filter((it) => it.id !== item);
            
        } else {
            alert("El producto no existe !")
        }
    }

    costoTotalTienda() {
        let valorCarrito = 0;
        for (const index of this.productos) {
            if (index.cantidad !== 0){
                console.log("llege")
                let costo = index.precio * index.cantidad
            valorCarrito += costo
            }
        }
        return valorCarrito

    }
}




/*--------------------------- Objetos ------------------------------*/



/*
 * Creamos el carrito de compras
 */

const carrito = new Carrito(1)
/*
 * Creamos la tienda
 */

const tienda = new Tienda(1)




