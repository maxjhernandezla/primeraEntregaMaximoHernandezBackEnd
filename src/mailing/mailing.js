import nodemailer from "nodemailer";
import config from '../config/dotenv.config.js'

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.userNodemailer,
    pass: config.passNodemailer,
  },
});

const registerEmail = async (user) => {
  await transporter.sendMail({
    from: "Max Shoes customer service",
    to: `${user.email}`,
    subject: "Te registraste en Max Shoes",
    html: `<h1>Max Shoes</h1>
    <h3>Bienvenido! ${user.first_name}</h3>
    <p>Usted se ha registrado exitosamente en nuestro sitio.</p><br>
    <p>Muchas gracias por registrarse</p>`,
  });
};

const purchaseEmail = async (ticket) => {
  console.log(ticket);
  await transporter.sendMail({
    from: "Max Shoes customer service",
    to: `${ticket.purchaser}`,
    subject: "Realizaste una compra en Max Shoes",
    html: `<h1>Max Shoes</h1>
    <h3>Compra realizada!</h3>
    <p>Su compra se realizó con exito.</p><br>
    <p>El total a pagar es de: $${ticket.amount}</p><br>
    <p>Puede realizar el seguimiento junto con el código de su compra: ${ticket.code}</p>
    <h3>Muchas gracias por su compra!</h3>`,
  });
};

const purchaseEmailAndNoStock = async (ticket) => {
  await transporter.sendMail({
    from: "Max Shoes customer service",
    to: `${ticket.purchaser}`,
    subject: "Realizaste una compra en Max Shoes",
    html: `<h1>Max Shoes</h1>
    <h3>Compra realizada!</h3>
    <p>Su compra se realizó con exito.</p><br>
    <p>El total a pagar es de: $${ticket.amount}</p><br>
    <p>Puede realizar el seguimiento junto con el código de su compra: ${ticket.code}</p>
    <p>Sin embargo, tienes que revisar tu carrito porque algunos de los productos seleccionados fueron excluidos de la compra por falta de stock.</p>
    <h3>Muchas gracias por su compra!</h3>`,
  });
};

const noStockEmail = async (purchaser) => {
  await transporter.sendMail({
    from: "Max Shoes customer service",
    to: `${purchaser}`,
    subject: "Su compra en Max Shoes ha sido rechazada.",
    html: `<h1>Max Shoes</h1>
    <h3>Su compra no ha realizada!</h3>
    <p>Su compra fue rechazada por falta de stock. Los productos seleccionados no tienen stock suficiente para su compra.</p>
    <h3>Disculpe las molestias!</h3>`,
  });
};

export { registerEmail, purchaseEmail, noStockEmail, purchaseEmailAndNoStock };
