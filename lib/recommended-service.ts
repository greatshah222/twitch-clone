import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 10000));

	let userId;

	try {
		const self = await getSelf(); // cause this breeack our app so try catch
		userId = self.id;
	} catch {
		userId = null;
	}

	let users = [];

	if (userId) {
		/// FOR LOGGED IN USER ->we are removing self

		users = await db.user.findMany({
			where: {
				AND: [
					{
						NOT: {
							id: userId,
						},
					},

					{
						NOT: {
							followedBy: {
								some: {
									followerId: userId, // SO IF FOLLLOWING WE WILL NOT RETURN THIS AS WELL
								},
							},
						},
					},

					{
						NOT: {
							blocking: {
								some: {
									blockedId: userId, // also not showing blocked user
								},
							},
						},
					},
				],
			},
			include: {
				stream: {
					select: {
						isLive: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} else {
		// FOR LOGGED OUT USER
		users = await db.user.findMany({
			include: {
				stream: {
					select: {
						isLive: true,
					},
				},
			},

			orderBy: {
				createdAt: "desc",
			},
		});
	}

	return users;
};
