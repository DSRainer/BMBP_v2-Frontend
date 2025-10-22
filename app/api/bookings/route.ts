import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Booking, IBooking } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const { 
      fullName, 
      phoneNumber, 
      eventDate,
      location,
      expectedGuests,
      packageTitle,
      packageSubtitle,
      basePrice,
      selectedTheme,
      selectedActivities = [],
      selectedAddOns = [],
      basePackagePrice,
      addOnsTotal = 0,
      totalPrice,
      notes
    } = body;

    if (!fullName || !phoneNumber || !packageTitle || !selectedTheme) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create booking document
    const bookingData: Partial<IBooking> = {
      // User Information
      fullName,
      phoneNumber,
      
      // Event Details
      eventDate: eventDate ? new Date(eventDate) : undefined,
      location,
      expectedGuests,
      
      // Package Information
      packageTitle,
      packageSubtitle,
      basePrice: parseFloat(basePrice) || 0,
      
      // Selections
      selectedTheme,
      selectedActivities,
      selectedAddOns,
      
      // Pricing
      basePackagePrice: parseFloat(basePackagePrice) || parseFloat(basePrice) || 0,
      addOnsTotal: parseFloat(addOnsTotal) || 0,
      totalPrice: parseFloat(totalPrice) || parseFloat(basePrice) || 0,
      
      // Metadata
      bookingStatus: 'pending',
      paymentStatus: 'pending',
      notes
    };

    // Create and save booking
    const booking = new Booking(bookingData);
    const savedBooking = await booking.save();

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      bookingId: savedBooking._id,
      booking: {
        id: savedBooking._id,
        fullName: savedBooking.fullName,
        phoneNumber: savedBooking.phoneNumber,
        packageTitle: savedBooking.packageTitle,
        totalPrice: savedBooking.totalPrice,
        bookingStatus: savedBooking.bookingStatus,
        createdAt: savedBooking.createdAt
      }
    });

  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Get recent bookings (limit for admin purposes)
    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-__v'); // Exclude version key

    return NextResponse.json({
      success: true,
      bookings: bookings.map(booking => ({
        id: booking._id,
        fullName: booking.fullName,
        packageTitle: booking.packageTitle,
        eventDate: booking.eventDate,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
        paymentStatus: booking.paymentStatus,
        createdAt: booking.createdAt
      }))
    });

  } catch (error) {
    console.error('Get Bookings API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}