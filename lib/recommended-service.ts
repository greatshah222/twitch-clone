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
				NOT: {
					id: userId,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} else {
		// FOR LOGGED OUT USER
		users = await db.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	return users;
};
