import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import config from "../../../src/config/dotenv.config.js";
const expect = chai.expect;
const requester = supertest("http://localhost:8080");

try {
  await mongoose.connect(process.env.MONGO_URL);
} catch (error) {
  console.log(error);
}

describe("Testing products", () => {
  let cookie;
  
  before(async () => {
    await mongoose.connection.collection("users").drop();
  });
  
  beforeEach(async () => {
    await mongoose.connection.collection("products").deleteMany({});

  })

  it("Tiene que registrar un usuario y hacer el login correctamente", async () => {

    const registerUser = {
      first_name: "Mock",
      last_name: "User",
      email: "mu@mock.com",
      age: 25,
      password: "1234",
      role: "admin",
    };
    const { statusCode } = await requester.post("/api/sessions/register").send(registerUser);
    expect(statusCode).to.be.eql(200)
    const user = {
      email: registerUser.email,
      password: registerUser.password,
    };
    const result = await requester.post("/api/sessions/login").send(user);
    const cookieResult = result.headers["set-cookie"][0];
    expect(cookieResult).to.be.ok;
    const cookieResultSplit = cookieResult.split("=");
    cookie = {
      name: cookieResultSplit[0],
      value: cookieResultSplit[1],
    };
    expect(cookie.name).to.be.eql("sessionCookie");
    expect(cookie.value).to.be.ok;
  });

  it("Tiene que obtener los 10 primeros productos en forma de array", async () => {

    const { statusCode, _body } = await requester.get("/api/products");
    expect(statusCode).to.be.eql(200);
    expect(Array.isArray(_body.data.docs)).to.be.eql(true);
    expect(_body.data.limit).to.be.eql(10);
  });

  it("Tiene que agregar un producto a la BDD correctamente", async () => {

    const mockProduct = {
      title: "Product 1",
      brand: "Mock",
      description: "Mock Product 1",
      price: 300,
      category: "Mock Product",
      stock: 15,
      code: "AAA100",
    };
    const { statusCode, _body } = await requester
      .post("/api/products")
      .send(mockProduct)
      .set("Cookie", `${cookie.name}=${cookie.value}`);
    expect(statusCode).to.be.eql(200);
    expect(_body.data._id).to.be.ok;

  });

  it("Tiene que obtener un producto por su id", async () => {

    const mockProduct = {
      title: "Product 1",
      brand: "Mock",
      description: "Mock Product 1",
      price: 300,
      category: "Mock Product",
      stock: 15,
      code: "AAA100",
    };
    const product = await requester
      .post("/api/products")
      .send(mockProduct)
      .set("Cookie", `${cookie.name}=${cookie.value}`);
    expect(product).to.be.ok;
    const { statusCode, _body } = await requester.get(
      `/api/products/${product._body.data._id}`
    );
    expect(statusCode).to.be.eql(200);
    expect(_body.data.title).to.be.eql("Product 1");

  });
});
