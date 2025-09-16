import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Contact, IContact } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const { 
      fullName, 
      phoneNumber, 
      email,
      city,
      eventDate,
      message
    } = body;

    if (!fullName || !phoneNumber || !email || !city) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: fullName, phoneNumber, email, and city are required' },
        { status: 400 }
      );
    }

    // Validate city is one of the allowed values
    const allowedCities = ['Mumbai', 'Bangalore', 'Delhi'];
    if (!allowedCities.includes(city)) {
      return NextResponse.json(
        { success: false, error: 'Invalid city. Must be one of: Mumbai, Bangalore, Delhi' },
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

    // Create contact document
    const contactData: Partial<IContact> = {
      fullName,
      phoneNumber,
      email,
      city,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      message,
      isResolved: false
    };

    // Create and save contact
    const contact = new Contact(contactData);
    const savedContact = await contact.save();

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: savedContact._id,
      contact: {
        id: savedContact._id,
        fullName: savedContact.fullName,
        email: savedContact.email,
        city: savedContact.city,
        createdAt: savedContact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // This endpoint could be used by admins to view contact submissions
    // For now, we'll return a simple response
    
    // Connect to database
    await connectDB();

    // Get recent contacts (limit for demo purposes)
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-__v'); // Exclude version key

    return NextResponse.json({
      success: true,
      contacts: contacts.map(contact => ({
        id: contact._id,
        fullName: contact.fullName,
        email: contact.email,
        city: contact.city,
        eventDate: contact.eventDate,
        isResolved: contact.isResolved,
        createdAt: contact.createdAt
      }))
    });

  } catch (error) {
    console.error('Get Contacts API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}