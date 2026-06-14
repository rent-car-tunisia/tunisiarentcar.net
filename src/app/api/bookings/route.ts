import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api/v1';
const SITE_SLUG = process.env.SITE_SLUG || 'locationvoitures-tunisie';
const SITE_API_KEY = process.env.SITE_API_KEY || '';

/**
 * POST /api/bookings
 * 
 * Receives the checkout form data from the frontend and proxies it
 * to the backend's POST /api/v1/public/bookings endpoint.
 * 
 * Transforms the frontend payload to match the backend's expected schema:
 * - Adds siteSlug
 * - Maps upsell slugs to backend UUIDs
 * - Maps field names (returnLocation -> dropoffLocation)
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Basic honeypot check
        if (body.website) {
            return NextResponse.json(
                { error: 'Invalid submission' },
                { status: 400 }
            );
        }

        // Resolve upsell slugs to UUIDs if any were selected
        let upsellIds: string[] = [];
        if (body.upsells && body.upsells.length > 0) {
            try {
                const upsellsResponse = await fetch(
                    `${BACKEND_API_URL}/public/sites/${SITE_SLUG}/upsells`,
                    {
                        headers: { 'X-Api-Key': SITE_API_KEY },
                    },
                );
                if (upsellsResponse.ok) {
                    const allUpsells: Array<{ id: string; slug: string }> = await upsellsResponse.json();
                    upsellIds = body.upsells
                        .map((slug: string) => allUpsells.find(u => u.slug === slug)?.id)
                        .filter(Boolean);
                }
            } catch (err) {
                console.warn('Failed to resolve upsell UUIDs:', err);
                // Continue without upsells rather than failing the booking
            }
        }

        // Build backend payload
        const backendPayload = {
            siteSlug: SITE_SLUG,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            carId: body.carId,
            pickupLocation: body.pickupLocation,
            dropoffLocation: body.returnLocation || body.pickupLocation,
            pickupDate: body.pickupDate,
            pickupTime: body.pickupTime,
            returnDate: body.returnDate,
            returnTime: body.returnTime,
            customerNote: body.customerNote || undefined,
            upsellIds,
        };

        // Extract real client IP and user agent to forward to backend
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || '';
        const userAgent = request.headers.get('user-agent') || '';

        // Forward to backend
        const response = await fetch(`${BACKEND_API_URL}/public/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': SITE_API_KEY,
                ...(clientIp && { 'x-forwarded-for': clientIp }),
                ...(userAgent && { 'user-agent': userAgent }),
            },
            body: JSON.stringify(backendPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Backend booking error:', data);
            return NextResponse.json(
                { error: data.error || 'Booking failed' },
                { status: response.status }
            );
        }

        // Return success with booking reference
        // Backend returns: { success, bookingRef, leadId, rentalDays, totalPrice }
        return NextResponse.json({
            success: true,
            booking: {
                orderNumber: data.bookingRef,
                id: data.leadId,
                rentalDays: data.rentalDays,
                totalPrice: data.totalPrice,
            },
        }, { status: 201 });

    } catch (error: unknown) {
        console.error('Booking API route error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
