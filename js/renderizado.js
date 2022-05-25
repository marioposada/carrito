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
# Renderizar Carrito
# Renderizar Tienda

----------------------------------------------------------------------*/
/*--------------------------------------------------------------------*/

/*--------------------------- Renderizar Carrito ------------------------------*/

function renderizarCarrito() {



    // Nodo principal de las cards (ul)
    const misProductos = document.getElementById('cards1');
    const miCheckOut = document.createElement("button")
    const checkContent = document.createElement("div")
    const miSubtotal = document.createElement("div")
    const miSub = document.createElement("div")
    const miTotal = document.createElement("div")
    const miX = document.createElement("i")
    const miContainer = document.getElementById("panel")

    miCheckOut.setAttribute("class", "btn")
    miCheckOut.textContent = "Finalizar compra"
    misProductos.textContent = ""


    miX.setAttribute("class", "bx bx-x bx-md equis")
    checkContent.setAttribute("class", "checkContent")
    miSubtotal.setAttribute("class", "subtotal")
    miSub.setAttribute("class", "sub")
    miTotal.setAttribute("class", "total")
    miSub.textContent = "SUBTOTAL"
    miTotal.textContent = tienda.costoTotalTienda().toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });
    miContainer.appendChild(miX)

    tienda.productos.forEach(({
        url,
        nombre,
        id,
        precio,
        cantidad
    }) => {



        // Armamos las cards
        const miListBody = document.createElement('li');
        const miNodoCardBody = document.createElement("div");
        const miNodoImagen = document.createElement("div");
        const miImagen = document.createElement("img");
        const miNodoCardContent = document.createElement("div");
        const miNodoP = document.createElement("p");
        const miNodoBin = document.createElement("div");
        const miNodoCart = document.createElement("i");
        const miNodoPrecio = document.createElement("p")

        // Seteamos atributos y clases
        miListBody.setAttribute("class", "cards_item1")
        miNodoCardBody.setAttribute("class", "card1");
        miNodoImagen.setAttribute("class", "card_image1")
        miNodoPrecio.setAttribute("class", "cantidad_precio")
        miNodoPrecio.innerText = `${cantidad}x${precio.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
          })}`

        // imagen
        miImagen.setAttribute("class", "imag")
        miImagen.setAttribute("src", url)

        //titulo
        miNodoCardContent.setAttribute("class", "card_content")
        miNodoP.setAttribute("class", "card_title")
        miNodoP.textContent = nombre


        miNodoBin.setAttribute("class", "card_bin")
        miNodoCart.setAttribute("class", "bx");
        miNodoCart.setAttribute("class", "bx bx-cart-download bx-md");
        miNodoCart.setAttribute("marcador", id);


        // Apendeamos
        miNodoBin.appendChild(miNodoCart)

        miNodoCardContent.appendChild(miNodoP)
        miNodoCardContent.appendChild(miNodoPrecio)


        miNodoImagen.appendChild(miImagen);

        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoCardContent);
        miNodoCardBody.appendChild(miNodoBin);

        miListBody.appendChild(miNodoCardBody);
        misProductos.appendChild(miNodoCardBody);


    });

    miSubtotal.appendChild(miSub)
    miSubtotal.appendChild(miTotal)
    checkContent.appendChild(miSubtotal)
    checkContent.appendChild(miCheckOut)
    misProductos.appendChild(checkContent)

    // tienda.productos.length == 0 && d.querySelector(".panel").classList.toggle("is-active");

}



/*--------------------------- Renderizar Tienda ------------------------------*/

function renderizarProductos() {

    const
        misProductos = document.querySelector("#cards"),
        templateProductos = document.getElementById("template_productos").content,
        fragmentProductos = document.createDocumentFragment();


    fetch("https://api.jsonbin.io/b/628d79fd402a5b38020c2b3a")
        .then((res) => res.json())
        .then((data) => {
            datos = data;

            datos.forEach((items) => {


                templateProductos.querySelector("img").setAttribute("src", items.url);
                templateProductos.querySelector("h2").textContent = items.nombre;
                templateProductos.querySelector("p").textContent = items.precio.toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                });;
                templateProductos.querySelector("button").setAttribute('marcador', items.id)



                let cloneProductos = document.importNode(templateProductos, true);

                fragmentProductos.appendChild(cloneProductos)
            })

            misProductos.append(fragmentProductos);



        })
}