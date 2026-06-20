import { NextRequest, NextResponse } from "next/server";

// Step 2 of the Decap CMS GitHub OAuth flow.
// GitHub redirects back here after the user approves access, with a
// short-lived "code". We exchange that code for a real access token,
// then hand the token to the Decap CMS popup window via postMessage,
// exactly the format Decap's GitHub backend expects.

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!code) {
    return new NextResponse("Missing authorization code from GitHub.", { status: 400 });
  }
  if (!clientId || !clientSecret) {
    return new NextResponse(
      "Missing GITHUB_OAUTH_CLIENT_ID or GITHUB_OAUTH_CLIENT_SECRET environment variables.",
      { status: 500 }
    );
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error || !tokenData.access_token) {
    return new NextResponse(
      `GitHub OAuth error: ${tokenData.error_description || tokenData.error || "Unknown error"}`,
      { status: 400 }
    );
  }

  const token = tokenData.access_token;

  // Decap's GitHub backend listens for a postMessage in this exact format.
  const script = `
    <!DOCTYPE html>
    <html>
      <body>
        <script>
          (function() {
            function receiveMessage(message) {
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({ token, provider: "github" })}',
                message.origin
              );
              window.removeEventListener("message", receiveMessage, false);
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script>
      </body>
    </html>
  `;

  return new NextResponse(script, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
