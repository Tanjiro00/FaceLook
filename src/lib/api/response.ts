import { NextResponse } from "next/server";

export function errorResponse(
  error: string,
  status: number,
  code?: string
): NextResponse {
  return NextResponse.json(
    { error, ...(code ? { code } : {}) },
    { status }
  );
}
