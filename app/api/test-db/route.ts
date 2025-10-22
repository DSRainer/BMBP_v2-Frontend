import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Booking, Contact } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    await connectDB();
    console.log('✅ Database connected successfully');

    // Create a test booking if none exist
    const bookingCount = await Booking.countDocuments();
    const contactCount = await Contact.countDocuments();
    
    console.log(`Current counts - Bookings: ${bookingCount}, Contacts: ${contactCount}`);
    
    if (bookingCount === 0) {
      console.log('Creating test booking...');
      const testBooking = new Booking({
        fullName: 'Test User',
        phoneNumber: '+91 9876543210',
        packageTitle: 'Test Package',
        packageSubtitle: 'Test Subtitle',
        basePrice: 15000,
        selectedTheme: {
          id: 'test-1',
          category: 'test',
          title: 'Test Theme',
          description: 'Test Description',
          image: 'https://example.com/test.jpg'
        },
        selectedActivities: [],
        selectedAddOns: [],
        basePackagePrice: 15000,
        addOnsTotal: 0,
        totalPrice: 15000,
        bookingStatus: 'pending',
        paymentStatus: 'pending'
      });
      
      await testBooking.save();
      console.log('✅ Test booking created');
    }
    
    if (contactCount === 0) {
      console.log('Creating test contact...');
      const testContact = new Contact({
        fullName: 'Test Contact',
        phoneNumber: '+91 9876543210',
        email: 'test@example.com',
        city: 'Mumbai',
        message: 'This is a test contact submission'
      });
      
      await testContact.save();
      console.log('✅ Test contact created');
    }

    // Get updated counts
    const finalBookingCount = await Booking.countDocuments();
    const finalContactCount = await Contact.countDocuments();

    return NextResponse.json({
      success: true,
      message: 'Database test completed successfully',
      data: {
        connectionStatus: 'connected',
        bookingsCount: finalBookingCount,
        contactsCount: finalContactCount,
        mongodbUri: process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') || 'Not configured'
      }
    });

  } catch (error) {
    console.error('❌ Database test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        mongodbUri: process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') || 'Not configured'
      },
      { status: 500 }
    );
  }
}