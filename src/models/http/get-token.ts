"use server";
import { cookies } from "next/headers";
import { StorageKeys } from "../storage/keys";
export default async function getToken(): Promise<string | null> {
	const token = cookies().get(StorageKeys.token)?.value;
	if (token) {
		return token;
	} else {
		return null;
	}
}
