import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ENTRY_ROUTE = process.env.ENTRY_ROUTE

export default async function middleware(req) {
    const currentPath = req.nextUrl.pathname;
    const publicRoutes = ['/login', '/favicon.ico'];
    const cookieStore = await cookies();
    const isPublic = publicRoutes.includes(currentPath);
    const session = cookieStore.get('session')?.value;
    const auth = cookieStore.get('auth')?.value;

    // Redirect from /crm to /crm/home
    if (currentPath === ENTRY_ROUTE) {
        return NextResponse.redirect(new URL(`${ENTRY_ROUTE}/home`, req.nextUrl));
    }

    // Allow public routes
    if (isPublic) {
        if (session && auth) {
            return NextResponse.redirect(new URL(`${ENTRY_ROUTE}/home`, req.nextUrl));
        }
        return NextResponse.next();
    }

    // Redirect to login if session is missing
    if (!session || !auth) {
        return NextResponse.redirect(new URL(`${ENTRY_ROUTE}/login`, req.nextUrl));
    }

    // Continue with request
    return NextResponse.next();
}

// Middleware configuration (apply to all except API/static files)
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.PNG$|.*\\.png$|.*\\.ico$).*)'],
};


