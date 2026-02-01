import { Request } from "express";
import { DeviceInfo } from "../dto/product/auth/JwtPayload.dto";

export const extractDeviceInfo = (req: Request): DeviceInfo => {
  const userAgent = req.headers["user-agent"] || "";
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  let browser = "Unknown";
  if (userAgent.includes("Chrome") && !userAgent.includes("Edge"))
    browser = "Chrome";
  else if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    browser = "Safari";
  else if (userAgent.includes("Edge")) browser = "Edge";
  else if (userAgent.includes("Opera")) browser = "Opera";

  let os = "Unknown";
  if (userAgent.includes("Windows")) os = "Windows";
  else if (userAgent.includes("Mac OS X")) os = "macOS";
  else if (userAgent.includes("Linux")) os = "Linux";
  else if (userAgent.includes("Android")) os = "Android";
  else if (userAgent.includes("iPhone") || userAgent.includes("iPad"))
    os = "iOS";

  return {
    browser,
    os,
    ip,
    userAgent,
  };
};
