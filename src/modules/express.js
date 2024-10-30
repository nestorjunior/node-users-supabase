const express = require("express");
const { UserModel } = require("../models/user.model");
const { connectDatabase } = require("../database/connect");
const { supabase } = require("../database/connect");

const app = express();
const port = 3000;
app.use(express.json());
connectDatabase();

app.post("/users", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  try {
    await UserModel.createUser({ first_name, last_name, email });
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).send("Error creating user");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error searching for users");
  }
});

app.get("/users/:email", async (req, res) => {
  try {
    const user = await UserModel.getUserByEmail(req.params.email);
    if (user) res.json(user);
    else res.status(404).send("User not found");
  } catch (error) {
    res.status(500).send("Error searching for user");
  }
});

app.delete("/users/:email", async (req, res) => {
  try {
    await UserModel.deleteUser(req.params.email);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

app.listen(port, () => {
  console.log(`Loading on port: ${port}`);
});
