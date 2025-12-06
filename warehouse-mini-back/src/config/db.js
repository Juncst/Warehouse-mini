import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    console.log("🔌 Conectando a Mongo...");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log("✅ Mongo conectado");
  } catch (err) {
    console.error("❌ Error Mongo:", err.message);
    process.exit(1);
  }
}
