import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./actions";

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
	return (
		<div className="flex flex-col gap-y-4">
			<p>username:{user?.username}</p>
			<p>user Id {user?.id}</p>

			<p>isFollowing {`${isFollowing}`}</p>
			<Actions isFollowing={isFollowing} userId={user?.id} />
		</div>
	);
};

export default UserPage;
