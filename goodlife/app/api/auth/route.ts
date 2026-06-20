import { NextRequest, NextResponse } from "next/server";

// Step 1 of the Decap CMS GitHub OAuth flow.
// When someone clicks "Login with GitHub" on /admin, Decap opens a popup
// pointed at this route. We redirect that popup to GitHub's own
// authorization screen, asking for permission to read/write this repo.

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "Missing GITHUB_OAUTH_CLIENT_ID environment variable. Set this in your Vercel project settings.",
      { status: 500 }
    );
  }

  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/callback`;

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", clientId);
  githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
  githubAuthUrl.searchParams.set("scope", "repo,user");

  return NextResponse.redirect(githubAuthUrl.toString());
}
