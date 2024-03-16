"use server";

import { revalidatePath } from "next/cache";
import { RoomServiceClient } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET!
);

export const onblock = async (id: string) => {
	const self = await getSelf();

	let blockedUser;

	try {
		blockedUser = await blockUser(id);
	} catch (error) {
		// THIS MEANS USER IS GUEST
		// ALLOW ABILITY TO KICK THE GUEST
	}

	try {
		//   DISCONNECT FORM LIVE STREAM
		// will work for both loggedin and out user
		await roomService.removeParticipant(self.id, id); // it accepts room name and our room name is always self .id
	} catch (error) {
		// THIS MEANS USER IS NOT IN THIS ROOM - DO NOTHING
	}

	revalidatePath(`/u${self.username}/community`);

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
