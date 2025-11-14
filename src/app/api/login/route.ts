import { NextResponse } from "next/server";
import { GeneralHTTPRequest } from "@src/shared/axios";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const email = process.env.NEXT_PUBLIC_EMAIL;
    const dbId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const body = await request.json();
    const loginRes = await GeneralHTTPRequest.post(
      '/user/loginPortalNew',
      {
        ...body,
      }
    )
    const cookieStore = await cookies();
    const intToken = loginRes.data.token ?? ''
    
    cookieStore.set(
      'accessToken',
      intToken,
      {
        sameSite: 'strict',
        secure: false,
      }
    )

    console.log('intToken', intToken)
    console.log('email', email);
    console.log('dbId', dbId);

    const loginAccurate = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth/token/redis`,
      {
        email,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          'x-token': intToken,
        }
      }
    )

    const accurateToken = loginAccurate.data.access_token ?? ''
    cookieStore.set(
      'accurateToken',
      accurateToken,
      {
        sameSite: 'strict',
        secure: false,
      }
    )

    console.log('accurateToken', accurateToken);

    setTimeout(() => console.log('callback'), 1000)

    const openDbResult = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/open-db-sequence`,
      { id: dbId },
      {
        headers: {
          'x-token': intToken,
          Authorization: `bearer ${accurateToken}`,
        }
      }
    )
    cookieStore.set(
      'sessionId',
      openDbResult.data.session,
      {
        sameSite: 'strict',
        secure: false,
      }
    )

    return NextResponse.json(loginRes.data, { status: 200 });
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