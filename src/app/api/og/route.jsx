import { ImageResponse } from "next/og";
// import { tw } from "@vercel/og-tw";

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "TeraPeek";
    const description =
      searchParams.get("description") ||
      "Inspect, preview, and download Terabox & Terashare videos.";

    return new ImageResponse(
      (
        <div tw="bg-red-500 w-full h-full flex items-center justify-center text-white font-bold text-8xl">hello</div>
      )
    );
  } catch (e) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
