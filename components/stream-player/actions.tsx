"use client";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
	hostIdentity: string;
	isFollowing: boolean;
	isHost: boolean;
}

export const Actions = ({ hostIdentity, isFollowing, isHost }: ActionsProps) => {
	const { userId } = useAuth();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(hostIdentity)
				.then((data) => toast.success(`You are now following ${data?.following.username}`))
				.catch(() => toast.error("something went wrong"));
		});
	};
	const handleUnFollow = () => {
		startTransition(() => {
			onUnFollow(hostIdentity)
				.then((data) => toast.success(`You have unfollowed ${data?.following.username}`))
				.catch(() => toast.error("something went wrong"));
		});
	};

	const toggleFollow = () => {
		if (!userId) {
			return router.push("/sign-in");
		}

		if (isHost) return;

		if (isFollowing) {
			// UNFOLLOW
			handleUnFollow();
		} else {
			// FOLLOW
			handleFollow();
		}
	};
	return (
		<Button
			onClick={toggleFollow}
			variant={"primary"}
			size={"sm"}
			className="w-full lg:w-auto"
			disabled={isPending || isHost}
		>
			<Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")} />
			{isFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
};

export const ActionsSkeleton = () => {
	return <Skeleton className="h-10 w-full lg:w-24" />;
};
