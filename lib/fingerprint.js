import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const generateFingerprint = async () => {
    if (typeof window !== "undefined") {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId; // Esto es una cadena de texto única
    }
    return "No disponible en backend";
};

