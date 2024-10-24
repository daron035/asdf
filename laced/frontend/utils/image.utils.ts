import { createHmac } from "crypto";
import base64url from "base64url";

const KEY = "66cc6f6ef0fea6ad00d0582ba6b8843b42791d828859757ee3c57c374dc7c779";
const SALT = "5f14c36b37df56208cd7a0c412f13bda2817c3d106bb583dfb069ffce0bd3f26";

export function getImgURL(url: string | null, a: any): string {
  if (url === null) {
    return "/logo.svg";
  }
  const hexDecode = (hex: string) => Buffer.from(hex, "hex");

  const sign = (salt: string, target: string, secret: string) => {
    const hmac = createHmac("sha256", hexDecode(secret));
    hmac.update(hexDecode(salt));
    hmac.update(target);

    return base64url.fromBase64(hmac.digest("base64"));
  };

  // 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
  // dev mode
  const link = url.replace("127.0.0.1", "host.docker.internal");
  const base64Encoded = btoa(link);
  // 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨

  // let a = process.env.NODE_ENV !== "production";
  // console.log(a);
  // console.log(process.env.NODE_ENV);

  // production
  // const base64Encoded = btoa(url);
  const path = `/rs:fit:${a}/${base64Encoded}`;
  // const path = `/rs:fit:300:300/${base64Encoded}`;
  const signature = sign(SALT, path, KEY);
  // const imgUrl = `http://localhost:8080/imgproxy/${signature}${path}`;
  // console.log("🚨", imgUrl);
  const imgUrl = `http://imgproxy:8080/imgproxy/${signature}${path}`;
  // const imgUrl = `http://176.109.104.181:8083/imgproxy/${signature}${path}`;
  return imgUrl;
}
