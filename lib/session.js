import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteSession, getUserLanguageByUsername } from "./server-utils";

const secureCookies = process.env.HTTP_COOKIE === "https";
const SESSION_SERVICE = process.env.SESSION_SERVICE;
const AUTH_SERVICE = process.env.AUTH_SERVICE;

export async function verifySession(fingerprint, pathname, payload = {}) {
  const cookieStore = await cookies();
  const authcookie = cookieStore.get("auth")?.value;
  const userLang = cookieStore.get("userLang")?.value;
  const session = cookieStore.get("session")?.value;
  if (!authcookie || !session) {
    redirect("/login");
  }

  //console.log("SESSION IN VERIFY SESSION", session)
  try {
    const response = await fetch(`${SESSION_SERVICE}/updateSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        Cookie: `auth=${authcookie}`,
        "X-Client-Fingerprint": fingerprint,
        "X-Client-Location": pathname,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    const prevSession = await JSON.parse(session)
    result.user.empresa = prevSession.empresa

    cookieStore.set({
      name: "session",
      value: JSON.stringify(result.user),
      httpOnly: true,
      secure: secureCookies,
      path: "/", // Ensure cookie applies to all paths
      sameSite: "lax",
    });

    if (!userLang) {
      await createUserLangCookie(result.user.username);
    }

    return result;
  } catch (error) {
    console.error("Session error:", error);
    await destroySession();
    redirect("/login");
  }
}

export async function updateSession(payload = {}) {
  try {
    const cookieStore = await cookies();
    const session = await verifySession(payload);

    if (!session) {
      return false;
    }

    //parsed.expires = new Date(Date.now() + (8 * 60 * 60 * 1000));

    //console.log("UPDATED SESSION", session)

    const newSessionToken = session?.authToken;

    newSessionToken.empresa = session.empresa;

    cookieStore.set({
      name: "session",
      value: newSessionToken,
      httpOnly: true,
      secure: secureCookies,
      path: "/", // Ensure cookie applies to all paths
      sameSite: "lax",
    });

    return true;
  } catch (error) {
    return false;
  }
}

export async function createSession(username, password, fingerprint) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    cookieStore.delete("auth");

    //console.log("FINGERPRINT IN CREATESESSION", fingerprint)

    const res = await fetch(`${AUTH_SERVICE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
        fingerprint,
        location: "/crm/login",
      }),
    });

    if (!res.ok) {
      const result = await res.json();
      //console.log("ERROR IN CREATESESSION", result)
      return { user: null, error: result.error, authToken: null };
    }

    const responseCookies = res.headers.get("Set-Cookie");
    const authCookie = responseCookies.match(/auth=([^;]*)/);
    if (authCookie) {
      const cookieValue = authCookie[1]; // Extracts the cookie value

      //console.log("cookie value", cookieValue)

      // Now set it manually in the browser (but note: you cannot set HttpOnly via JS)
      cookieStore.set({
        name: "auth",
        value: cookieValue,
        httpOnly: true,
        secure: secureCookies,
        path: "/", // Ensure cookie applies to all paths
        sameSite: "lax",
      });
    }

    const result = await res.json();

    cookieStore.set({
      name: "session",
      value: JSON.stringify(result.user),
      httpOnly: true,
      secure: secureCookies,
      path: "/", // Ensure cookie applies to all paths
      sameSite: "lax",
    });

    return result;
  } catch (error) {
    return { user: null, error: error, authToken: null };
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) {
    return null;
  }
  return JSON.parse(session);
}

export async function destroySession() {
  const success = await deleteSession();

  if (!success) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("auth");

  return true;
}

export async function createUserLangCookie(username) {
  const cookieStore = await cookies();

  const userLang = await getUserLanguageByUsername(username);

  await cookieStore.set({
    name: "userLang",
    value: userLang,
    httpOnly: true,
    secure: secureCookies,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

export async function getUserLangCookie() {
  const cookieStore = await cookies();
  const userLang = cookieStore.get("userLang")?.value;
  if (!userLang) {
    return "es";
  }
  return userLang;
}

export async function updateCompanyInSessionCookie(newCompany) {
  try {
    const cookieStore = await cookies();
    const cookie = await cookieStore.get("session");
    if (!cookie || !cookie.value) throw new Error("Session cookie not found");

    // Parse the JSON inside the cookie
    const session = JSON.parse(cookie.value);

    // Update the empresa value
    session.empresa = newCompany;

    // Save the updated session back into the cookie store
    await cookieStore.set({
      name: "session",
      value: JSON.stringify(session),
      httpOnly: true,
      secure: secureCookies,
      path: "/", // Ensure cookie applies to all paths
      sameSite: "lax",
    });

  } catch (err) {
    console.error("Failed to update session cookie:", err);
  }
}
