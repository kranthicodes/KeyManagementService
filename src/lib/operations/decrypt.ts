import { api } from "./api";
import { encodeToken } from "../auth/encodeToken";

export async function decrypt(
  ciphertext: Uint8Array | string | null,
  keyName: string,
): Promise<string> {
  const encodedData = await encodeToken({ ciphertext, keyName });

  try {
    const decryptRequest = (await api.post("/decrypt", { encodedData })).data
      .data;

    if (!decryptRequest) {
      throw new Error("Error decrypting on server.");
    }

    return decryptRequest;
  } catch (e) {
    throw new Error("Error decrypting on server.");
  }
}
