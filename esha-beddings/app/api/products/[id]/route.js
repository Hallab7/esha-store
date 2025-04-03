import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

// ✅ Connect to DB
await dbConnect();

// 🔹 Update product (PUT)
export async function PUT(req, { params }) {
  try {
    const { name, description, price, image, category, adminToken } = await req.json();

    // 🔒 Admin Authorization
    if (adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Ensure all required fields are provided
    if (!name || !description || !price || !image || !category) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Update the product with the new details
    await Product.findByIdAndUpdate(params.id, { name, description, price, image, category });

    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}

// 🔹 Delete product (DELETE)
export async function DELETE(req, { params }) {
  try {
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
  }
}
