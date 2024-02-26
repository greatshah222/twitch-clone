import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSelf = async () => {
	const self = await currentUser();
	if (!self || !self.username) {
		return new Error("Unauthorized");
	}

	const user = await db.user.findUnique({
		where: {
			externalUserId: self.id,
		},
	});

	if (!user) {
		return new Error("Not found");
	}

	return user;
};
