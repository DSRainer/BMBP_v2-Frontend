import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action !== 'migrate') {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use {"action": "migrate"}' },
        { status: 400 }
      );
    }

    console.log('🚀 Starting database migration...');
    
    // Step 1: Connect to the test database first to get the data
    const testDbUri = process.env.MONGODB_URI?.replace('/bookmybirthdayparty?', '/test?');
    console.log('📊 Connecting to test database to read data...');
    
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    // Connect to test database
    await mongoose.connect(testDbUri!, { bufferCommands: false });
    console.log('✅ Connected to test database');
    
    // Get data from test database
    const testBookings = await mongoose.connection.db!.collection('bookings').find({}).toArray();
    const testContacts = await mongoose.connection.db!.collection('contacts').find({}).toArray();
    
    console.log(`📊 Found ${testBookings.length} bookings and ${testContacts.length} contacts in test database`);
    
    // Step 2: Close test connection and connect to target database
    await mongoose.connection.close();
    console.log('❌ Closed test database connection');
    
    // Step 3: Connect to the correct database
    const targetDbUri = process.env.MONGODB_URI;
    console.log('🎯 Connecting to target database...');
    await mongoose.connect(targetDbUri!, { bufferCommands: false });
    
    const targetDbName = mongoose.connection.db?.databaseName;
    console.log(`✅ Connected to target database: ${targetDbName}`);
    
    // Step 4: Insert data into target database
    let migratedBookings = 0;
    let migratedContacts = 0;
    
    if (testBookings.length > 0) {
      await mongoose.connection.db!.collection('bookings').insertMany(testBookings);
      migratedBookings = testBookings.length;
      console.log(`✅ Migrated ${migratedBookings} bookings`);
    }
    
    if (testContacts.length > 0) {
      await mongoose.connection.db!.collection('contacts').insertMany(testContacts);
      migratedContacts = testContacts.length;
      console.log(`✅ Migrated ${migratedContacts} contacts`);
    }
    
    // Step 5: Verify migration
    const finalBookingCount = await mongoose.connection.db!.collection('bookings').countDocuments();
    const finalContactCount = await mongoose.connection.db!.collection('contacts').countDocuments();
    
    console.log(`📊 Final counts in ${targetDbName}: ${finalBookingCount} bookings, ${finalContactCount} contacts`);
    
    // Step 6: Clear global cache to ensure fresh connections
    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database migration completed successfully',
      migration: {
        source: 'test',
        target: targetDbName,
        migratedBookings,
        migratedContacts,
        finalCounts: {
          bookings: finalBookingCount,
          contacts: finalContactCount
        }
      }
    });

  } catch (error) {
    console.error('❌ Database migration failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database migration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking database status...');
    
    // Check current connection
    const currentDb = mongoose.connection.db?.databaseName || 'Not connected';
    const connectionState = mongoose.connection.readyState;
    
    // Get connection string info
    const mongodbUri = process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
    
    return NextResponse.json({
      success: true,
      status: {
        currentDatabase: currentDb,
        connectionState: connectionState, // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
        expectedDatabase: 'bookmybirthdayparty',
        isCorrectDatabase: currentDb === 'bookmybirthdayparty',
        mongodbUri
      },
      instructions: {
        migrate: 'POST to this endpoint with {"action": "migrate"} to move data from test to bookmybirthdayparty database'
      }
    });

  } catch (error) {
    console.error('❌ Status check failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Status check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}