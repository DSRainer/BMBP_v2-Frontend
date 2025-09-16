import mongoose, { Schema, Document } from 'mongoose';

// Base interfaces
export interface ITheme {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

export interface IActivity {
  id: string;
  name: string;
  description?: string;
  icon: string;
  included: boolean;
  image: string;
}

export interface IAddOn {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
}

export interface IBooking extends Document {
  // User Information
  fullName: string;
  phoneNumber: string;
  email?: string;
  
  // Event Details
  eventDate?: Date;
  location?: string;
  expectedGuests?: string;
  
  // Package Information
  packageTitle: string;
  packageSubtitle: string;
  basePrice: number;
  
  // Selections
  selectedTheme: ITheme;
  selectedActivities: IActivity[];
  selectedAddOns: IAddOn[];
  
  // Pricing
  basePackagePrice: number;
  addOnsTotal: number;
  totalPrice: number;
  
  // Metadata
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Contact form schema
export interface IContact extends Document {
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;
  eventDate?: Date;
  message?: string;
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Enquiry form schema (for contact form submissions)
export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  eventDate?: Date;
  location: string;
  guests?: string;
  budget?: string;
  specialRequests?: string;
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Theme Schema
const ThemeSchema = new Schema({
  id: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

// Activity Schema
const ActivitySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String, required: true },
  included: { type: Boolean, required: true },
  image: { type: String, required: true }
});

// AddOn Schema
const AddOnSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  price: { type: Number, required: true }
});

// Main Booking Schema
const BookingSchema = new Schema({
  // User Information
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  
  // Event Details
  eventDate: { type: Date },
  location: { type: String },
  expectedGuests: { type: String },
  
  // Package Information
  packageTitle: { type: String, required: true },
  packageSubtitle: { type: String, required: true },
  basePrice: { type: Number, required: true },
  
  // Selections
  selectedTheme: { type: ThemeSchema, required: true },
  selectedActivities: [ActivitySchema],
  selectedAddOns: [AddOnSchema],
  
  // Pricing
  basePackagePrice: { type: Number, required: true },
  addOnsTotal: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  
  // Metadata
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  notes: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Contact Schema
const ContactSchema = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  city: { 
    type: String, 
    required: true,
    enum: ['Mumbai', 'Bangalore', 'Delhi']
  },
  eventDate: { type: Date },
  message: { type: String },
  isResolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Enquiry Schema (for main contact form)
const EnquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventDate: { type: Date },
  location: { 
    type: String, 
    required: true,
    enum: ['Mumbai', 'Bangalore', 'Delhi']
  },
  guests: { type: String },
  budget: { type: String },
  specialRequests: { type: String },
  isResolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
BookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

ContactSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

EnquirySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Export models
export const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
export const Enquiry = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);