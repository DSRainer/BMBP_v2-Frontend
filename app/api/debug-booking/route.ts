import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('🔍 Debugging booking data structure:');
    console.log('Full request body:', JSON.stringify(body, null, 2));
    
    if (body.selectedAddOns && body.selectedAddOns.length > 0) {
      console.log('📊 Add-ons analysis:');
      body.selectedAddOns.forEach((addon: any, index: number) => {
        console.log(`Add-on ${index}:`, {
          id: addon.id,
          name: addon.name,
          icon: addon.icon,
          iconType: typeof addon.icon,
          iconValue: JSON.stringify(addon.icon),
          price: addon.price
        });
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Booking data structure analyzed',
      analysis: {
        hasAddOns: body.selectedAddOns && body.selectedAddOns.length > 0,
        addOnsCount: body.selectedAddOns?.length || 0,
        addOnsData: body.selectedAddOns?.map((addon: any) => ({
          id: addon.id,
          name: addon.name,
          iconType: typeof addon.icon,
          iconValue: addon.icon,
          price: addon.price
        })) || [],
        fullData: body
      }
    });

  } catch (error) {
    console.error('❌ Debug analysis failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Debug analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}