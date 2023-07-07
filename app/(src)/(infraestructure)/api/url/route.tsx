import { NextRequest, NextResponse } from "next/server"

export async function POST(req: Request) {
  const request = await req.json();

  const data = {
    original: request.original,
    shortened: request.shortened
  }

  console.log(data);

  const response = await fetch("https://asurlshortenerdev.azurewebsites.net/createshortened", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "Authorization": request.token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response;
}