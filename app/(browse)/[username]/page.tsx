import { notFound } from "next/navigation";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

import { Actions } from "./actions";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
	params: {
		username: string;
	};
}

const UserPage = async ({ params: { username } }: UserPageProps) => {
	const user = await getUserByUsername(username);

	if (!user || !user.stream) {
		notFound();
	}

	const isFollowing = await isFollowingUser(user.id); // if not logged in then it will be false

	const isBlocked = await isBlockedByUser(user.id); // if not logged in then it will be false

	if (isBlocked) {
		notFound();
	}

	return <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />;
};

export default UserPage;
