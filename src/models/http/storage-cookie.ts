"use server";
import { cookies } from "next/headers";
import { StorageKeys } from "../storage/keys";
export async function setCookies(token: string) {
	cookies().set(StorageKeys.token, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60,
		path: "/",
	});
}
