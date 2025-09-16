import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Forcing database reconnection...');
    
    // Close existing connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('❌ Closed existing connection');
    }
    
    // Clear cache
    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
      console.log('🧹 Cleared connection cache');
    }
    
    // Get fresh connection string
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log('🔗 Using connection string:', MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    // Force new connection
    const connection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    
    const dbName = connection.connection.db?.databaseName;
    console.log('✅ Fresh connection established to database:', dbName);
    
    return NextResponse.json({
      success: true,
      message: 'Database reconnected successfully',
      data: {
        databaseName: dbName,
        connectionState: mongoose.connection.readyState,
        mongodbUri: MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')
      }
    });

  } catch (error) {
    console.error('❌ Database reconnection failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database reconnection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}