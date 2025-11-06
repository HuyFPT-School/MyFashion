import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerClerkId: { type: String, required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      color: String,
      size: String,
      quantity: { type: Number, required: true },
    },
  ],
  shippingAddress: { type: String, required: true },
  shippingRate: String, 
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["momo", "cod"], default: "cod" },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  orderStatus: { type: String, enum: ["processing", "shipped", "delivered", "cancelled"], default: "processing" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;