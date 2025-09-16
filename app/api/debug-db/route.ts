import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Booking, Contact } from '@/lib/models';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debug Database Connection...');
    
    // Test connection
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Get current database information
    const dbName = mongoose.connection.db?.databaseName;
    console.log(`📊 Connected to database: ${dbName}`);
    
    // List all collections in the database
    const collections = await mongoose.connection.db?.listCollections().toArray();
    console.log('📂 Collections found:', collections?.map(c => c.name));
    
    // Get counts from each collection
    const bookingCount = await Booking.countDocuments();
    const contactCount = await Contact.countDocuments();
    
    console.log(`📊 Counts - Bookings: ${bookingCount}, Contacts: ${contactCount}`);
    
    // Get actual document samples
    const sampleBookings = await Booking.find({}).limit(2).lean();
    const sampleContacts = await Contact.find({}).limit(2).lean();
    
    // Get collection stats
    let bookingStats = null;
    let contactStats = null;
    
    try {
      const db = mongoose.connection.db;
      if (db) {
        bookingStats = await db.collection('bookings').stats();
        contactStats = await db.collection('contacts').stats();
      }
    } catch (statsError) {
      console.log('⚠️ Stats collection failed:', statsError);
      // Continue without stats
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database debug completed successfully',
      debug: {
        connectionStatus: 'connected',
        databaseName: dbName,
        mongodbUri: process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'),
        collections: collections?.map(c => ({ 
          name: c.name, 
          type: c.type 
        })) || [],
        documentCounts: {
          bookings: bookingCount,
          contacts: contactCount
        },
        collectionStats: {
          bookings: bookingStats ? {
            count: bookingStats.count,
            size: bookingStats.size,
            storageSize: bookingStats.storageSize
          } : null,
          contacts: contactStats ? {
            count: contactStats.count,
            size: contactStats.size,
            storageSize: contactStats.storageSize
          } : null
        },
        sampleData: {
          bookings: sampleBookings?.map(b => ({
            id: b._id,
            fullName: b.fullName,
            packageTitle: b.packageTitle,
            createdAt: b.createdAt
          })),
          contacts: sampleContacts?.map(c => ({
            id: c._id,
            fullName: c.fullName,
            email: c.email,
            createdAt: c.createdAt
          }))
        }
      }
    });

  } catch (error) {
    console.error('❌ Database debug failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database debug failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        mongodbUri: process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'reset') {
      await connectDB();
      
      // Clear existing collections
      await Booking.deleteMany({});
      await Contact.deleteMany({});
      
      console.log('🧹 Collections cleared');
      
      // Create fresh test data
      const testBooking = new Booking({
        fullName: 'Test User - New DB',
        phoneNumber: '+91 9876543210',
        packageTitle: 'Premium Birthday Package',
        packageSubtitle: 'Complete celebration setup',
        basePrice: 25000,
        selectedTheme: {
          id: 'theme-1',
          category: 'princess',
          title: 'Princess Theme',
          description: 'Magical princess party theme',
          image: 'https://example.com/princess.jpg'
        },
        selectedActivities: [],
        selectedAddOns: [],
        basePackagePrice: 25000,
        addOnsTotal: 0,
        totalPrice: 25000,
        bookingStatus: 'pending',
        paymentStatus: 'pending'
      });
      
      const testContact = new Contact({
        fullName: 'Test Contact - New DB',
        phoneNumber: '+91 9876543210',
        email: 'test@newdb.com',
        city: 'Mumbai',
        message: 'Test contact in correct database'
      });
      
      await testBooking.save();
      await testContact.save();
      
      console.log('✅ Fresh test data created');
      
      return NextResponse.json({
        success: true,
        message: 'Database reset and test data created successfully',
        data: {
          bookingsCreated: 1,
          contactsCreated: 1,
          databaseName: mongoose.connection.db?.databaseName
        }
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('❌ Database reset failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database reset failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}