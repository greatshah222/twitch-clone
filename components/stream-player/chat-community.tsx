"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

import { Input } from "../ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "./community-item";

interface ChatCommunityProps {
	viewerName: string;
	hostName: string;
	isHidden: boolean;
}

export const ChatCommunity = ({ isHidden, hostName, viewerName }: ChatCommunityProps) => {
	const [value, setValue] = useState("");
	const participants = useParticipants();
	const debouncedValue = useDebounce<string>(value, 500);

	const onChange = (newValue: string) => {
		setValue(newValue);
	};

	const filteredParticipants = useMemo(() => {
		const deduped = participants.reduce((acc, participant) => {
			const hostAsViewer = `host-${participant.identity}`; // we added this prefix for host when creating them in db
			if (!acc.some((p) => p.identity === hostAsViewer)) {
				acc.push(participant); // removing host
			}
			return acc;
		}, [] as (RemoteParticipant | LocalParticipant)[]);

		return deduped.filter((participant) => {
			return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
		});
	}, [participants, debouncedValue]);

	if (isHidden) {
		return (
			<div className="flex flex-1 items-center justify-center">
				<p className="text-sm text-muted-foreground">Community is disabled</p>
			</div>
		);
	}

	return (
		<div className="p-4">
			<Input
				onChange={(e) => onChange(e.target.value)}
				placeholder="Search community"
				className="border-white/10"
			/>

			<ScrollArea className="gap-y-2 mt-4">
				{/* ONLY VISIBLE IF IT IS THE LAST CHILD */}
				<p className="text-center text-sm text-muted-foreground last:block p-2">No result</p>

				{filteredParticipants?.map((el) => (
					<CommunityItem
						key={el.identity}
						hostName={hostName}
						viewerName={viewerName}
						participantName={el.name}
						participantIdentity={el.identity}
					/>
				))}
			</ScrollArea>
		</div>
	);
};
