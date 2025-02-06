import { NextResponse } from "next/server";
import { addFavorite, removeFavorite } from "@/services/favorites/favoritesService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const { stock_symbol } = await request.json();
    const result = await addFavorite(session.user.email, stock_symbol);
    return NextResponse.json(result);
  } catch (error) {
    console.error('즐겨찾기 추가 오류:', error);
    return NextResponse.json({ error: "즐겨찾기 추가 실패" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const { stock_symbol } = await request.json();
    await removeFavorite(session.user.email, stock_symbol);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('즐겨찾기 삭제 오류:', error);
    return NextResponse.json({ error: "즐겨찾기 삭제 실패" }, { status: 500 });
  }
}