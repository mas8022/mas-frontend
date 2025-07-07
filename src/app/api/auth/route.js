import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { accessToken, sessionId } = await req.json();

    const accessTokenCookie = serialize("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
      sameSite: "none",
      domain: ".liara.run",
    });

    const sessionIdCookie = serialize("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "none",
      domain: ".liara.run",
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": [accessTokenCookie, sessionIdCookie],
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "خطایی رخ داد." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    const { newAccessToken } = await req.json();

    const accessTokenCookie = serialize("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
      sameSite: "none",
      domain: ".liara.run",
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": accessTokenCookie,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطا در ست کردن کوکی" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();

    cookieStore.delete("access_token");
    cookieStore.delete("session_id");

    return NextResponse.json({
      status: 200,
      message: "شما با موفقیت خارج شدید",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "خطا در خروج از حساب. لطفاً بعداً تلاش کنید.",
      },
      { status: 500 }
    );
  }
}
