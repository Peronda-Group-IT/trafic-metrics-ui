"use client"

import { generateFingerprint } from "@/lib/fingerprint";
import { useEffect } from "react";

import { redirect, usePathname } from "next/navigation";
import { tryVerifyInyectedCookie, verifyFingerprint } from "@/app/login/actions";

export default function FingerprintGen() {

    const pathName = usePathname();
    // console.log("PATHNAME IN FINGERPRINT", pathName); // Puedes mantener o quitar los logs según necesites

    useEffect(() => {
        // Renombramos la función para claridad, ya que genera Y verifica
        const generateAndVerify = async () => {
            try {
                const fingerprint = await generateFingerprint();
                //console.log("FINGERPRINT GENERADO:", fingerprint);

                // Llama a la Server Action para verificar
                const response = await verifyFingerprint(fingerprint, `crm${pathName}`); // Pasamos el path si la acción lo necesita
                //console.log("RESPUESTA VERIFICACIÓN:", response);
                
                if (response.error){
                    redirect('/login')
                }

            } catch (error) {
                console.error("Error generando/verificando fingerprint:", error);
                // Considera cómo manejar errores aquí (¿mostrar mensaje al usuario?)
            }
        };

        const verifyInyectedCookie = async() => {
            const fingerprint = await generateFingerprint();
            const response = await tryVerifyInyectedCookie(fingerprint, `crm${pathName}`); // Pasamos el path si la acción lo necesita
            //console.log("RESPUESTA VERIFICACIÓN:", response);
        }

        // Comprueba la ruta actual
        if (!pathName.includes('/login')) {
            // NO es la página de login -> genera y verifica siempre
            generateAndVerify();
        } else {
            // SÍ es la página de login
            // 2. Comprueba si existe la cookie 'auth' inyectada en modo no httpOnly
            const result = verifyInyectedCookie();
            if (result.error){
                redirect('/login')
            }
        }
    // El efecto depende de pathName para ejecutarse en cada cambio de ruta
    }, [pathName]);

    // Este componente no renderiza UI visible
    return null;
}