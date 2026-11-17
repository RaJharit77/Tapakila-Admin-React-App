declare const process: {
    env?: Record<string, string | undefined>;
};

export const API_URL =
    typeof process !== "undefined" && process.env
        ? process.env.API_URL || "http://localhost:3000"
        : "http://localhost:3000";