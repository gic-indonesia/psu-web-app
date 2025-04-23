import { NextResponse } from "next/server";
import { GeneralHTTPRequest } from "@src/shared/axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const loginRes = await GeneralHTTPRequest.post(
    '/user/loginPortalNew',
    {
      ...body,
    }
  )
  const cookieStore = await cookies();
  cookieStore.set(
    'accessToken',
    loginRes.data.token ?? '',
    {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    }
  )

  return NextResponse.json(loginRes.data, { status: 200 });
}