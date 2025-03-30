import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string[] } }
) {
    const apiKey = req.headers.get('X-Api-Key');
    const slug = (params.slug as string[]).join('/');
    const path = '/' + slug;


    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 200 }
        );
    }

    try {
        revalidatePath(path);
        return NextResponse.json({
            revalidated: true,
            page: path,
        });
    } catch (err) {
        return NextResponse.json('Error revalidating', {
            status: 500,
        });
    }
}