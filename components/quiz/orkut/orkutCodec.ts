export type OrkutResultPayload = {
  name: string;
  vibe: string;
  weekend: string;
  friends: number;
  fans: number;
  visits: number;
};

//
// encode (client-safe)
//
export function encodeOrkutPayload(
  payload: OrkutResultPayload
): string {

  const json = JSON.stringify(payload);

  const base64 = Buffer
    .from(json, "utf8")
    .toString("base64");

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

//
// decode (server-safe UTF-8)
//
export function decodeOrkutPayload(
  encoded: string
): OrkutResultPayload | null {

  try {

    const base64 = encoded
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const json = Buffer
      .from(base64, "base64")
      .toString("utf8");

    return JSON.parse(json);

  } catch {

    return null;

  }
}