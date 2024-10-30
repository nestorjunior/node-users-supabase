const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://bpefyiztzwukgcpfsnqy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwZWZ5aXp0end1a2djcGZzbnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNTI1MjksImV4cCI6MjA0NTgyODUyOX0.ZNhCk1oJTxDjdEJ7Tq-PE_jEHngaRfSPEbHNkEXfYO0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const connectDatabase = async () => {
  const { error } = await supabase.auth.signUp({
    email: process.env.SUPABASE_USERNAME,
    password: process.env.SUPABASE_PASSWORD,
  });

  if (error) {
    console.log("Erro:", error.message);
  } else {
    console.log("Connection database successful");
  }
};

module.exports = { connectDatabase, supabase };
