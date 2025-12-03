import mongoose, { Schema, Document, Model } from "mongoose";

export interface BookingDocument extends Document {
  eventId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  tickets: number;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
}

const BookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    tickets: { type: Number, required: true, min: 1 },
    notes: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Simple email format validation (optional)
BookingSchema.path("email").validate((val: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}, "Invalid email format");

export const Booking: Model<BookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", BookingSchema);

export default Booking;
