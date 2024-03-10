"use client";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { useState, useTransition, useRef, ElementRef } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogHeader,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from "@/components/ui/dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
	const closeRef = useRef<ElementRef<"button">>(null);
	const [ingressType, setingressType] = useState<IngressType>(RTMP);

	const [isPending, startTransition] = useTransition();

	const onSubmit = () => {
		startTransition(() => {
			createIngress(parseInt(ingressType))
				.then(() => {
					toast.success("Ingress created");
					closeRef?.current?.click();
				})
				.catch(() => toast.error("Something went wrong."));
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"primary"}>Generate connection</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate connection</DialogTitle>
				</DialogHeader>

				<Select
					disabled={isPending}
					value={ingressType}
					onValueChange={(value) => setingressType(value)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Ingress Type" />
						<SelectContent>
							<SelectItem value={RTMP}>RTMP</SelectItem>
							<SelectItem value={WHIP}>WHIP</SelectItem>
						</SelectContent>
					</SelectTrigger>
				</Select>

				<Alert>
					<AlertTriangle className="w-4 h-4" />

					<AlertTitle>Warning</AlertTitle>
					<AlertDescription>
						This action will reset all active streams using the current connection
					</AlertDescription>
				</Alert>

				<div className="flex justify-between">
					<DialogClose ref={closeRef} asChild>
						<Button variant={"ghost"}>Cancel</Button>
					</DialogClose>

					<Button onClick={onSubmit} variant={"primary"} disabled={isPending}>
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
