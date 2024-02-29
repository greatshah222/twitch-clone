import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const isFollowingUser = async (id: string) => {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({
			where: {
				id,
			},
		});

		if (!otherUser) {
			throw new Error("User not found");
		}

		if (otherUser.id === self.id) {
			return true; // WE ARE TRYING TO FOLLOW OURSELF
		}

		// checking if we are already following them
		const existingFollow = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followingId: otherUser.id,
			},
		});

		return !!existingFollow;
	} catch (error) {
		return false;
	}
};

export const followUser = async (id: string) => {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({
		where: {
			id,
		},
	});

	if (!otherUser) {
		throw new Error("User not found");
	}

	if (otherUser.id === self.id) {
		throw new Error("Cannot follow yourself");
	}

	//check if current user is already following the other user

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id,
		},
	});

	if (existingFollow) {
		throw new Error("Already following");
	}

	// now lets follow the other user
	const follow = await db.follow.create({
		data: {
			followerId: self.id,
			followingId: otherUser.id,
		},
		include: {
			follower: true, // acess to user
			following: true,
		},
	});

	return follow;
};

export const unfollowUser = async (id: string) => {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({
		where: {
			id,
		},
	});

	if (!otherUser) {
		throw new Error("User not found");
	}

	if (otherUser.id === self.id) {
		throw new Error("Cannot unfollow yourself");
	}

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id,
		},
	});

	if (!existingFollow) {
		throw new Error("Not following");
	}

	const follow = await db.follow.delete({
		where: {
			id: existingFollow.id,
		},
		include: {
			following: true,
		},
	});

	return follow;
};
