declare const process: {
    env?: Record<string, string | undefined>;
};

export const API_URL =
    typeof process !== "undefined" && process.env
        ? process.env.API_URL || "https://tapakila-app.vercel.app"
        : "https://tapakila-app.vercel.app";