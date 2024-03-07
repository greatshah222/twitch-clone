import { notFound } from "next/navigation";
import { Actions } from "./actions";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
	params: {
		username: string;
	};
}

const UserPage = async ({ params: { username } }: UserPageProps) => {
	const user = await getUserByUsername(username);

	if (!user) {
		notFound();
	}

	const isFollowing = await isFollowingUser(user.id);
	const isBlocked = await isBlockedByUser(user.id); // check if we are blocked by other user

	if (isBlocked) {
		return notFound(); // not allowing to see
	}

	return (
		<div className="flex flex-col gap-y-4">
			<p>username:{user?.username}</p>
			<p>user Id {user?.id}</p>

			<p>is blocked by this user:{`${isBlocked}`}</p>

			<p>isFollowing {`${isFollowing}`}</p>
			<Actions isFollowing={isFollowing} userId={user?.id} />
		</div>
	);
};

export default UserPage;
