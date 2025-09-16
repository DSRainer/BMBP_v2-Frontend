import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Booking } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Testing booking form submission...');
    
    // Connect to database
    await connectDB();
    
    // Create test booking data
    const testBookingData = {
      fullName: 'Test Booking User',
      phoneNumber: '+91 9876543210',
      eventDate: new Date('2024-12-25'),
      location: 'Test Venue Mumbai',
      expectedGuests: '15-25 guests',
      packageTitle: 'Test Package',
      packageSubtitle: 'Test Package Subtitle',
      basePrice: 15000,
      selectedTheme: {
        id: 'test-theme-1',
        category: 'princess',
        title: 'Test Princess Theme',
        description: 'Test theme description',
        image: 'https://example.com/test.jpg'
      },
      selectedActivities: [],
      selectedAddOns: [
        {
          id: 'addon-1',
          name: 'Test Photography',
          description: 'Professional photography',
          icon: 'Camera',  // String instead of React component
          price: 2000
        }
      ],
      basePackagePrice: 15000,
      addOnsTotal: 2000,
      totalPrice: 17000,
      notes: 'Test booking via API test endpoint'
    };
    
    // Make a request to the actual booking API
    const bookingResponse = await fetch(`${request.url.replace('/test-booking', '/bookings')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testBookingData),
    });
    
    const bookingResult = await bookingResponse.json();
    
    if (bookingResult.success) {
      // Verify the booking was saved
      const savedBooking = await Booking.findById(bookingResult.bookingId);
      
      return NextResponse.json({
        success: true,
        message: 'Booking form test completed successfully',
        test: {
          apiResponse: bookingResult,
          verifiedInDatabase: !!savedBooking,
          savedBookingData: savedBooking ? {
            id: savedBooking._id,
            fullName: savedBooking.fullName,
            packageTitle: savedBooking.packageTitle,
            totalPrice: savedBooking.totalPrice,
            createdAt: savedBooking.createdAt
          } : null
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Booking API test failed',
        details: bookingResult
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Booking test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Booking test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get recent bookings to verify they're being saved
    const recentBookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    
    return NextResponse.json({
      success: true,
      message: 'Recent bookings retrieved successfully',
      data: {
        totalBookings: await Booking.countDocuments(),
        recentBookings: recentBookings.map(booking => ({
          id: booking._id,
          fullName: booking.fullName,
          packageTitle: booking.packageTitle,
          totalPrice: booking.totalPrice,
          createdAt: booking.createdAt,
          isTestData: booking.notes?.includes('test') || booking.fullName.toLowerCase().includes('test')
        }))
      }
    });

  } catch (error) {
    console.error('❌ Get recent bookings failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get recent bookings',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}