import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import config from "../../../src/config/dotenv.config.js";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

try {
  await mongoose.connect(config.mongoUrl);
} catch (error) {
  console.log(error);
}

describe("Testing carts", () => {
  let cookie;

  before(async () => {
    await mongoose.connection.collection("users").deleteMany({});
  });

  it("Cuando se registra un usuario con rol 'user', tiene que crearse un carrito vacío que tenga un id de mongodb", async () => {
    const mockUser = {
      first_name: "Jerencio",
      last_name: "Fernandez",
      email: "jf@test.com",
      age: 25,
      password: "1234",
      role: "user",
    };
    const { _body } = await requester
      .post("/api/sessions/register")
      .send(mockUser);
    expect(_body.data.cart).to.have.property("_id");
    expect(_body.data.cart.products).to.be.deep.equal([]);
  });

  it("Un usuario de rol 'admin' puede obtener todos los carritos y debe retornarlos en un array", async () => {
    const adminUser = {
      first_name: "Administrador",
      last_name: "Fernandez",
      email: "af@test.com",
      age: 25,
      password: "1234",
      role: "admin",
    };
    await requester.post("/api/sessions/register").send(adminUser);
    const result = await requester.post("/api/sessions/login").send({email: adminUser.email, password: adminUser.password});
    const cookieResult = result.headers["set-cookie"][0];
    const cookieResultSplit = cookieResult.split("=");
    cookie = {
      name: cookieResultSplit[0],
      value: cookieResultSplit[1],
    };
    const {statusCode, _body} = await requester.get('/api/carts').set('Cookie', `${cookie.name} = ${cookie.value}`)
    expect(statusCode).to.be.equal(200)
    expect(Array.isArray(_body.data)).to.be.eql(true);
  });

});
