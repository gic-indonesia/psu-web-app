import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiesStore = await cookies();
  console.log('cookiesStore', cookiesStore);
  const intToken = cookiesStore.get("accessToken");
  const accurateToken = cookiesStore.get("accurateToken");
  const sessionId = cookiesStore.get("sessionId");
  if (intToken && accurateToken && sessionId) {
    return NextResponse.json({ status: 200, intToken: intToken.value, accurateToken: accurateToken.value, sessionId: sessionId.value });
  }
  return NextResponse.json({ status: 404, message: 'not found' })
}