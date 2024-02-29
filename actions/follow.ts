"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
	try {
		// await new Promise((resolve) => setTimeout(resolve, 10000));

		const followedUser = await followUser(id);

		revalidatePath("/");
		if (followedUser) {
			revalidatePath(`/${followedUser?.following.username}`);
		}

		return followedUser;
	} catch (error) {
		throw new Error("Internal error");
	}
};

export const onUnFollow = async (id: string) => {
	try {
		// await new Promise((resolve) => setTimeout(resolve, 10000));

		const unFollowedUser = await unfollowUser(id);

		revalidatePath("/");
		if (unFollowedUser) {
			revalidatePath(`/${unFollowedUser?.following.username}`);
		}

		return unFollowedUser;
	} catch (error) {
		throw new Error("Internal error");
	}
};
