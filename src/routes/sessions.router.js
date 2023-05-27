import { Router } from "express";
import userModel from "../dao/models/users.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    const exists = await userModel.findOne({email});
    if (exists)
      return res
        .status(400)
        .send({ status: "error", error: "User already exists" });
    const user = { first_name, last_name, email, age, password };
    await userModel.create(user);
    res.send({ status: "success", message: "User registered" });
  } catch (error) {
    res.status(500).send({ status: "error", error });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });
    if (!user)
    return res
    .status(400)
    .send({ status: "error", error: "Incorrect credentials" });
    
    if (user.email === "adminCoder@coder.com" && user.password === "Coder37960") {
      req.session.user = {
        username: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: "admin",
      };
    }
    else {
      req.session.user = {
        username: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: "user",
      };
    }
    res.send({ status: "success", message: "Login success" });
  } catch (error) {
    res.status(500).send({ error: "error", error });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ status: "error", error: err });
    res.redirect("/login");
  });
});

export default router