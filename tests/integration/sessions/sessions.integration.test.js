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

describe("Testing sessions", () => {
  let cookie;

  before(async () => {
    await mongoose.connection.collection("users").deleteMany({});
  });

  it("Tiene que registrar un usuario en la BDD correctamente", async () => {
      const mockUser = {
          first_name: "Agustin",
            last_name: "Alvarez",
            email: 'aa@test.com',
            age: 25,
            password: '1234',
            role: 'admin'
      }
      const {statusCode, _body} = await requester.post('/api/sessions/register').send(mockUser)
      expect(statusCode).to.be.eql(200)
      expect(_body.data._id).to.be.ok;
      expect(_body.data.first_name).to.be.eql(mockUser.first_name);
  })

  it("Tiene que hacer el login correctamente", async () => {
    const user = {
      email: "aa@test.com",
      password: "1234",
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

  it("Debe retornar los datos del usuario loggeado", async () => {

    const { statusCode, _body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", `${cookie.name}=${cookie.value}`);

    expect(statusCode).to.be.eql(200)
    expect(_body.data).to.have.property('name')
  });
});
