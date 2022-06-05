/*---
Author: Mario Posada
Author URI: 
Description: Carrito de compras para el curso de JavaScript en Coderhouse
Version: 1.0.0
License: GNU General Public License v2 or later

*/
/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
# Carga las funciones del DOM
# Carga las funciones generales para el funcionamiento del carrito
# Uso de LocalStorage para algunas variables


----------------------------------------------------------------------*/
/*--------------------------------------------------------------------*/


/*--------------------------- Carga las funciones del DOM ------------------------------*/


const d = document;


d.addEventListener("DOMContentLoaded", () => {

    cartMenu(".card_button");
    cart(".content-cart", ".panel");
    eraser(".bx-cart-download")
    renderizarProductos()
    vaciarCarrito(".vaciar")
    closes(".bx-x", ".panel");
    searchBar(".search");
    menuBar(".sidebar", ".hamb", ".bx-left-arrow-alt");
    checkOut(".btn");

})

function menuBar(side, menu, arrow) {

    d.addEventListener("click", (e) => {
        if (e.target.matches(menu) || e.target.matches(`${menu} *`)) {

            d.querySelector(side).classList.toggle("is-activ");

        }

    })

    d.addEventListener("click", (e) => {
        if (e.target.matches(arrow)) {

            d.querySelector(side).classList.toggle("is-activ");

        }

    })



}


// Funcion que procesa la barra de busqueda. Captura hasta la 3era letra que ingresas y la busca en el JSON
function searchBar(buscar) {

    d.addEventListener("keyup", (e) => {


            inputs = document.querySelector(".search").value
            inputs = inputs.toLowerCase();
            regex = new RegExp(/\d*(?:[a-zA-Z]){3,}\d*/)


            if (e.target.matches(buscar) && regex.test(inputs)) {


                modal()
            }

            // fetchData().then(data => {
            //     datos = data;

            //     for (const iterator of datos) {

            //         producto = iterator.nombre.toLowerCase()

            //         if (producto.includes(inputs)) {

            //             modal()


            // const id = iterator.id
            // const nombre = iterator.nombre
            // const precio = iterator.precio
            // const cantidad = iterator.cantidad
            // const categoria = iterator.categoria
            // const url = iterator.url

            // tienda.agregarItem(new Producto(id, nombre, precio, cantidad, categoria, url))


        }



    )
}



// Funcion para cerrar el carrito con la "X"
function closes(x, panel) {

    d.addEventListener("click", (e) => {
        if (e.target.matches(x) || e.target.matches(`${x} *`)) {

            d.querySelector(panel).classList.toggle("is-active");

        }

    })

}

function cart(content, panel) {

    d.addEventListener("click", (e) => {
        if (e.target.matches(content) || e.target.matches(`${content} *`)) {

            d.querySelector(panel).classList.toggle("is-active");
            renderizarCarrito();
        }

    })

}

function eraser(button1) {


    d.addEventListener("click", (e) => {
        if (e.target.matches(button1) || e.target.matches(`${button1} *`)) {
            ite = parseInt(e.target.getAttribute("marcador"));
            tienda.eliminarItem(ite)
            const miCart = document.getElementById("items-cart");
            itemsCarrito = parseInt(sessionStorage.getItem("itemCarrito"))
            itemsCarrito -= 1;
            miCart.textContent = itemsCarrito
            sessionStorage.setItem("itemCarrito", JSON.stringify(itemsCarrito));
            renderizarCarrito()
            tienda.productos.length == 0 && d.querySelector(".panel").classList.toggle("is-active");
            if (tienda.productos.length == 0) {

                miCart.textContent = tienda.productos.length;
            }



        }
    })

}

// Fetching del JSON desde localhost
async function fetchData() {
    const response = await fetch("https://api.jsonbin.io/b/628d79fd402a5b38020c2b3a")
    const data = await response.json();
    return data;
}

// Funcion que busca un objeto determinado dentro del carrito
function searchObj(obj, item) {
    console.log("Entro a buscar el objetocon" + item)
    console.log(obj)
    let istrue = false;

    for (k of obj) {


        if (k['id'] == item) {
            console.log("lo encontro")
            istrue = true;
            k['cantidad'] += 1;
            return istrue

        } else {
            console.log("No lo encontro")
            istrue = false;
        }

    }
    return istrue;
}

function aniadirAlCarrito() {


    const miCart = document.getElementById("items-cart");

    itemsCarrito = parseInt(sessionStorage.getItem("itemCarrito"))
    itemsCarrito += 1;
    miCart.textContent = itemsCarrito
    sessionStorage.setItem("itemCarrito", JSON.stringify(itemsCarrito));

}

function checkResta(button2) {

    d.addEventListener("click", (e) => {
        if (e.target.matches(button2) || e.target.matches(`${button2} *`)) {
            restarAlCarrito()
        }
    })

}

function vaciarCarrito(vaciar) {

    d.addEventListener("click", (e) => {
        if (e.target.matches(vaciar) || e.target.matches(`${vaciar} *`)) {

            const miCart = document.getElementById("items-cart");
            itemsCarrito = 0;
            miCart.textContent = itemsCarrito;


        }
    })

}

function restarAlCarrito() {


    const miCart = document.getElementById("items-cart");

    // localStorage.setItem("itemCarrito", JSON.stringify(itemsCarrito));
    // sessionStorage.setItem("itemCarrito", JSON.stringify(itemsCarrito));

    // miCart.textContent = JSON.parse(localStorage.getItem("itemCarrito"));
    miCart.textContent = tienda.productos.length()
}


function cartMenu(button) {


    d.addEventListener("click", (e) => {

        if (e.target.matches(button) || e.target.matches(`${button} *`)) {

            aniadirAlCarrito()

            carritoUser.push(parseInt(e.target.getAttribute("marcador")));

            // carritoUser.forEach((items) => {

            let items = parseInt(e.target.getAttribute("marcador"))



            if (tienda.productos.length === 0) {
                console.log("Carrito sin  productos, añadimos el primero")

                //fetcheamos el JSON
                fetchData().then(data => {
                    datos = data;

                    for (const iterator of datos) {

                        if (iterator.id === items) {
                            const id = iterator.id
                            const nombre = iterator.nombre
                            const precio = iterator.precio
                            const cantidad = iterator.cantidad
                            const categoria = iterator.categoria
                            const url = iterator.url

                            tienda.agregarItem(new Producto(id, nombre, precio, cantidad, categoria, url))

                            carritoUser.splice(0, carritoUser.length);
                        }

                    }

                });
                renderizarCarrito();
                // carritoUser.splice(0, carritoUser.length);


            } else if (searchObj(tienda.productos, items)) {

                console.log("Y sumamos cantidad de unidades")


            } else {
                console.log("Carrito con productos, pero no el que añadiste, asi que lo añadimos")
                //fetcheamos el JSON
                fetchData().then(data => {
                    datos = data;

                    for (const iterator of datos) {

                        if (iterator.id === items) {
                            const id = iterator.id
                            const nombre = iterator.nombre
                            const precio = iterator.precio
                            const cantidad = iterator.cantidad
                            const categoria = iterator.categoria
                            const url = iterator.url

                            tienda.agregarItem(new Producto(id, nombre, precio, cantidad, categoria, url))

                            carritoUser.splice(0, carritoUser.length);
                        }

                    }

                });
                renderizarCarrito();

            }







            Toastify({
                text: "Se agrego 1 item al carrito!",
                duration: 1000,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #08a31a, #1a7909a7)",
                },
                offset: {
                    x: 150, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 30 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                }
            }).showToast();


        }
    })
}

function checkOut(check) {

    d.addEventListener("click", (e) => {
        if (e.target.matches(check) || e.target.matches(`${check} *`)) {

            modal()


        }
    })

}

function modal() {
    window.open("#openModal")
}