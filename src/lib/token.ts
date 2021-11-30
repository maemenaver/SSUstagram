import { Request } from "express";

export function getToken(req: Request) {
    return req.cookies["access_token"];
}

/*
 * 여기 나중에 고쳐야함
 */
export function getBearerToken(req: Request) {
    const result = "Bearer " + getToken(req);
    console.log("getBearerToken", result);
    return result;
}
