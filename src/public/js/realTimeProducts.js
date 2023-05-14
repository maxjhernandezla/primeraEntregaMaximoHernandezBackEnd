const socket = io();

const container = document.getElementById("productContainer");
const btn = document.getElementById("form-btn");
const form = document.getElementById("form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const stock = document.getElementById("stock");
const category = document.getElementById("category");
const price = document.getElementById("price");
const code = document.getElementById("code");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("form-title");
  let description = document.getElementById("form-description");
  let price = document.getElementById("form-price");
  let stock = document.getElementById("form-stock");
  let code = document.getElementById("form-code");
  let category = document.getElementById("form-category");
  let newProduct = {
    title: title.value,
    description: description.value,
    price: price.value,
    stock: stock.value,
    code: code.value,
    category: category.value,
    status: true,
  };
  socket.emit("addProduct", newProduct);
  title.value = "";
  description.value = "";
  price.value = "";
  stock.value = "";
  code.value = "";
  category.value = "";
});

socket.on("showProducts", (data) => {
  container.innerHTML = ``;
  data.forEach((prod) => {
    container.innerHTML += `
        <div class='productContainer'>
            <ul>
                <li>Nombre: ${prod.title}</li>
                <li>Descripción: ${prod.description}</li>
                <li>Código: ${prod.code}</li>
                <li>Precio: ${prod.price}</li>
                <li>Estado: ${prod.status}</li>
                <li>Stock: ${prod.stock}</li>
                <li>Categoría: ${prod.category}</li>
                <li>Id: ${prod._id}</li>
            </ul>
            <button class='btn' onclick ='getId(${prod._id})' id='delete-btn-${prod._id}' value='${prod._id}'>Delete</button>
        </div>
        `;
  });
});

function getId(_id) {
  console.log(_id);
  socket.emit("deleteProduct", _id);
}
