'use server'

import { cookies } from "next/headers";
import { createSession, createUserLangCookie, verifySession } from "../../lib/session";
import { redirect } from "next/navigation";

export async function login(state, formData) {

    const username = formData.get("username");
    const password = formData.get("password");
    const fingerprint = formData.get("fingerprint");

    if (!username || !password) {
        return {
            error: 'Debe introducir usuario y contraseña'
        }
    } else {
      // Fetch user data
      const {user, error} = await createSession(username, password, fingerprint)

      await createUserLangCookie(username);

      //console.log("AUTH TOKEN IN LOGIN", authToken)

      if (error) return {
          error: error.message
      };

      //const payload = await decrypt(authToken)

      //console.log("SESSION IN LOGIN", payload)

      //const {success, role, message} = await fetchUserRole(username);

      //console.log("ROLE", role)

      //console.log("PAYLOAD TO ADD", payloadToAdd)
  
      //const sessionCreated = await updateSession(payloadToAdd);

      //console.log('SESSION IS CREATED', sessionCreated)
      
      if (user) redirect('/home');
    }
}

export async function logout() {
  // Destroy the session
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function verifyFingerprint (fingerprint, pathname) {
  const result = await verifySession(fingerprint, pathname)
  //console.log("RESULT IN VERIFY FINGERPRINT", result)
  return result;
}

export async function tryVerifyInyectedCookie(fingerprint, pathname) {
  const cookieStore = await cookies();
  const authcookie = cookieStore.get("auth")?.value;
  if (authcookie) {
    const result = await verifySession(fingerprint, pathname)
    if (result?.success){
      redirect('/');
    }
  }
}