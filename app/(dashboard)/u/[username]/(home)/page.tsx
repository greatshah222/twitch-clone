import { currentUser } from "@clerk/nextjs";

import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";

interface CreatorPageProps {
	params: {
		username: string;
	};
}

const CreatorPage = async ({ params: { username } }: CreatorPageProps) => {
	const externalUser = await currentUser();
	const user = await getUserByUsername(username);

	if (!user || user.externalUserId !== externalUser?.id || !user?.stream) {
		throw new Error("Unauthorized");
	}

	// is foloowing will always be true here
	return (
		<div className="h-full">
			<StreamPlayer user={user} stream={user?.stream} isFollowing />
		</div>
	);
};

export default CreatorPage;
