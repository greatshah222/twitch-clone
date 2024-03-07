"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onblock = async (id: string) => {
	// TODO DISCONNECT FORM LIVE STREAM
	// ALLOW ABILITY TO KICK THE GUEST
	const blockedUser = await blockUser(id);

	revalidatePath("/");

	if (blockedUser) {
		revalidatePath(`/${blockedUser.blocked.username}`);
	}

	return blockedUser;
};

export const onUnblock = async (id: string) => {
	const unblockedUser = await unblockUser(id);

	revalidatePath("/");

	if (unblockedUser) {
		revalidatePath(`/${unblockedUser.blocked.username}`);
	}

	return unblockedUser;
};
