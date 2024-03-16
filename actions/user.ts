"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<User>) => {
	const self = await getSelf();

	// ONLY ALLOW BIO TO BE CHANGED CAUSE CLERK HANDLES OTHERS VIA WEBHOOK
	const validData = {
		bio: values.bio,
	};

	const user = await db.user.update({
		where: {
			id: self.id,
		},
		data: {
			...validData,
		},
	});

	// USER CAN CHANGE THIS FROM BOTH BELOW ROUTE

	revalidatePath(`/${self.username}`);
	revalidatePath(`/u/${self.username}`);

	return user;
};
