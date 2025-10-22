import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Enquiry, IEnquiry } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const { 
      name, 
      email,
      phone,
      location,
      eventDate,
      guests,
      budget,
      specialRequests
    } = body;

    if (!name || !email || !phone || !location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, phone, and location are required' },
        { status: 400 }
      );
    }

    // Validate location is one of the allowed values
    const allowedLocations = ['Mumbai', 'Bangalore', 'Delhi'];
    if (!allowedLocations.includes(location)) {
      return NextResponse.json(
        { success: false, error: 'Invalid location. Must be one of: Mumbai, Bangalore, Delhi' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create enquiry document
    const enquiryData: Partial<IEnquiry> = {
      name,
      email,
      phone,
      location,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      guests,
      budget,
      specialRequests,
      isResolved: false
    };

    // Create and save enquiry
    const enquiry = new Enquiry(enquiryData);
    const savedEnquiry = await enquiry.save();

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully! We will contact you soon.',
      enquiryId: savedEnquiry._id,
      enquiry: {
        id: savedEnquiry._id,
        name: savedEnquiry.name,
        email: savedEnquiry.email,
        location: savedEnquiry.location,
        createdAt: savedEnquiry.createdAt
      }
    });

  } catch (error) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // This endpoint could be used by admins to view enquiry submissions
    
    // Connect to database
    await connectDB();

    // Get recent enquiries (limit for demo purposes)
    const enquiries = await Enquiry.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-__v'); // Exclude version key

    return NextResponse.json({
      success: true,
      enquiries: enquiries.map(enquiry => ({
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        location: enquiry.location,
        eventDate: enquiry.eventDate,
        guests: enquiry.guests,
        budget: enquiry.budget,
        specialRequests: enquiry.specialRequests,
        isResolved: enquiry.isResolved,
        createdAt: enquiry.createdAt
      }))
    });

  } catch (error) {
    console.error('Get Enquiries API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}