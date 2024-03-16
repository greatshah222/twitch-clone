import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const isBlockedByUser = async (id: string) => {
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
			return false; // so user cannot block themselves
		}

		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: otherUser.id,
					blockedId: self.id,
				},
			},
		});

		return !!existingBlock;
	} catch (error) {
		return false; // if anything goes wrong
	}
};

export const blockUser = async (id: string) => {
	const self = await getSelf();

	if (self.id === id) {
		throw new Error("Cannot block yourseld");
	}

	const otherUser = await db.user.findUnique({
		where: {
			id,
		},
	});
	if (!otherUser) {
		throw new Error("User not found");
	}

	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});
	if (existingBlock) {
		throw new Error("Already blocked");
	}

	// we are blocking other user
	const block = await db.block.create({
		data: {
			blockerId: self.id,
			blockedId: otherUser.id,
		},
		include: {
			blocked: true, // user which was blocked
		},
	});

	return block;
};

export const unblockUser = async (id: string) => {
	const self = await getSelf();

	if (self.id === id) {
		throw new Error("Cannot unblock yourseld");
	}

	const otherUser = await db.user.findUnique({
		where: {
			id,
		},
	});
	if (!otherUser) {
		throw new Error("User not found");
	}

	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});
	if (!existingBlock) {
		throw new Error("cannot block user - not blocked before");
	}

	// we are blocking other user
	const unblock = await db.block.delete({
		where: {
			id: existingBlock.id,
		},
		include: {
			blocked: true, // prev blocked person
		},
	});
	return unblock;
};

export const getBlockedUsers = async () => {
	const self = await getSelf();

	const blockedUsers = await db.block.findMany({
		where: {
			blockerId: self.id,
		},
		include: {
			blocked: true,
		},
	});

	return blockedUsers;
};
