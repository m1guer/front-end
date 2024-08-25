"use server";
import { cookies } from "next/headers";
import { StorageKeys } from "../storage/keys";
export default async function deleteCooki() {
	cookies().delete(StorageKeys.token);
}
