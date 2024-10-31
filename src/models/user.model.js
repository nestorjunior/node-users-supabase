const { supabase } = require("../database/connect");

async function createUsersTable() {
  const { error } = await supabase.rpc("create_users_table");
  if (error) {
    console.error("Error creating users table:", error.message);
  } else {
    console.log("User table created successfully.");
  }
}

const UserModel = {
  async createUser(data) {
    const { error } = await supabase.from("users").insert([data]);
    if (error) throw new Error(error.message);
    return "User created successfully!";
  },

  async getAllUsers() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching all users:", error.message);
      throw new Error(error.message);
    }
    return data;
  },

  async getUserByEmail(email) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (error) {
      console.error("Erro ao buscar usuário por email:", error.message);
      throw new Error(error.message);
    }
    return data;
  },

  async findByIdAndUpdate(id, newData) {
    const { data, error } = await supabase
      .from("users")
      .update(newData)
      .eq("id", id)
      .select("*");

    if (error) {
      console.error("Erro ao buscar usuário por id:", error.message);
      throw new Error(error.message);
    }
    return data[0];
  },

  async deleteUser(id) {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Error deleting user:", error.message);
      throw new Error(error.message);
    }
    return "User deleted successfully!";
  },
};

module.exports = { UserModel, createUsersTable };
