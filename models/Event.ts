import mongoose, { Schema, Document, Model } from "mongoose";

export interface EventDocument extends Document {
  title: string;
  slug: string;
  image: string;
  location: string;
  date: string; // normalized "YYYY-MM-DD"
  time: string; // normalized 24h "HH:MM"
  description?: string;
  venue: string;
  mode: "online" | "offline";
  agenda?: string;
  overview?: string;
  organizer?: string;
  tags?: string[];
}

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String },
    mode: { type: String, enum: ["online", "offline"], required: true },
    agenda: { type: String },
    overview: { type: String },
    organizer: { type: String },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

function toSlug(input: string): string {
  const ascii = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const cleaned = ascii.replace(/[^a-z0-9\s-]/g, "");
  const hyphenated = cleaned.trim().replace(/[\s_-]+/g, "-");
  return hyphenated.replace(/^-+|-+$/g, "");
}

function normalizeDate(input?: string): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (isNaN(d.getTime())) return input;
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const dy = String(d.getDate()).padStart(2, "0");
  return `${yr}-${mo}-${dy}`;
}

function normalizeTime(input?: string): string | undefined {
  if (!input) return undefined;
  let s = input.trim().toUpperCase();
  const ampmMatch = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (ampmMatch) {
    let hour = parseInt(ampmMatch[1], 10);
    const min = ampmMatch[2];
    const ampm = ampmMatch[3];
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${min}`;
  }
  const hhmm = s.match(/^(\d{1,2}):(\d{2})$/);
  if (hhmm) {
    const hour = Math.min(23, Math.max(0, parseInt(hhmm[1], 10)));
    const min = Math.min(59, Math.max(0, parseInt(hhmm[2], 10)));
    return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  }
  return input;
}

EventSchema.pre("save", async function () {
  const doc = this as EventDocument;
  const baseSlug = toSlug(doc.title);
  if (!doc.slug || toSlug(doc.slug) !== baseSlug) {
    doc.slug = baseSlug;
  }

  const nd = normalizeDate(doc.date);
  if (nd) doc.date = nd;
  const nt = normalizeTime(doc.time);
  if (nt) doc.time = nt;
});

// Prevent model overwrite in dev hot-reload
export const Event: Model<EventDocument> =
  mongoose.models.Event || mongoose.model<EventDocument>("Event", EventSchema);

export default Event;
