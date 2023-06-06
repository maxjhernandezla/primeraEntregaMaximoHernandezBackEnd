import { Router } from "express";
import passport from "passport";
import { createHash } from "../utils.js";
import userModel from "../dao/models/users.model.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "fail-register" }),
  async (req, res) => {
    res.send({ status: "success", message: "User registered" });
  }
);

router.get("/fail-register", (req, res) => {
  res.send({ status: "error", message: "Register failed" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "fail-login" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Invalid credentials" });

    if (req.user.email === "adminCoder@coder.com") {
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        role: "admin",
        email: req.user.email,
      };
    } else {
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        role: "user",
        email: req.user.email,
      };
    }
    res.send({ status: "success", message: "Login success" });
  }
);

router.get("/fail-login", (req, res) => {
  res.send({ status: "error", message: "Login failed" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    res.send({ status: "success", message: "user registered" });
  }
);

router.get(
  "/github-callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    if (req.user.email === "adminCoder@coder.com") {
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        role: "admin",
        email: req.user.email,
      };
    } else {
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        role: "user",
        email: req.user.email,
      };
    }
    res.redirect("/");
  }
);

router.post("/reset", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ status: "error", error: "User not found" });
    }

    user.password = createHash(password);

    await userModel.updateOne({ email }, user);

    res.send({ status: "success", message: "Password reset" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ status: "error", error: err });
    res.redirect("/login");
  });
});

export default router;

// try {
//   const user = await userModel.findOne({ email, password });
//   if (!user)
//     return res
//       .status(400)
//       .send({ status: "error", error: "Incorrect credentials" });

//   if (
//     user.email === "adminCoder@coder.com" &&
//     user.password === "Coder37960"
//   ) {
//     req.session.user = {
//       username: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//       role: "admin",
//     };
//   } else {
//     req.session.user = {
//       username: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//       role: "user",
//     };
//   }
//   res.send({ status: "success", message: "Login success" });
// } catch (error) {
//   res.status(500).send({ error: "error", error });
// }
