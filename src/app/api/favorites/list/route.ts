import { NextResponse } from "next/server";
import { getFavorites } from "@/services/favorites/favoritesService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const favorites = await getFavorites(session.user.email);
    return NextResponse.json(favorites);
  } catch (error) {
    console.error('즐겨찾기 목록 조회 오류:', error);
    return NextResponse.json({ error: "즐겨찾기 목록 조회 실패" }, { status: 500 });
  }
}