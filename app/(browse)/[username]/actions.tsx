"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { onblock } from "@/actions/block";

interface ActionProps {
	isFollowing: boolean;
	userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionProps) => {
	const [isPending, startTransition] = useTransition();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then((data) => toast.success(`You are now following ${data.following.username}`))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const handleUnFollow = () => {
		startTransition(() => {
			onUnFollow(userId)
				.then((data) => toast.success(`You have unfollowed ${data.following.username}`))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const onClick = () => {
		if (isFollowing) {
			handleUnFollow();
		} else {
			handleFollow();
		}
	};

	const handleBlock = () => {
		startTransition(() => {
			onblock(userId)
				.then((data) => toast.success(`Blocked the user ${data.blocked.username}`))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	return (
		<>
			<Button disabled={isPending} variant={"primary"} onClick={onClick}>
				{isFollowing ? "Unfollow" : "Follow"}
			</Button>

			<Button onClick={handleBlock} disabled={isPending}>
				Block user
			</Button>
		</>
	);
};
