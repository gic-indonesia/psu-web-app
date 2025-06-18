import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies()
    cookieStore.getAll().forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      console.log('Error:', e);
      return NextResponse.json(
        {
          message: e.message,
        },
        { status: 500 }
      );
    }
    console.log('Error:', e);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}