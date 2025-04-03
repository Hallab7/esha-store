import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

// ✅ Connect to DB
await dbConnect();

// 🔹 Get all products (GET)
export async function GET() {
  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}

// 🔹 Create new product (POST)
export async function POST(req) {
  try {
    const { name, description, price, image, category, adminToken } = await req.json();

    // 🔒 Admin Authorization
    if (adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Ensure that all required fields are provided
    if (!name || !description || !price || !image || !category) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newProduct = await Product.create({ name, description, price, image, category });
    return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Error adding product" }, { status: 500 });
  }
}
