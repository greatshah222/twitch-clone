"use client";
import { useState, useTransition, useRef, ElementRef } from "react";
import { toast } from "sonner";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { updateUser } from "@/actions/user";

interface BioModalProps {
	initialvalue: string | null;
}
export const BioModal = ({ initialvalue }: BioModalProps) => {
	const [value, setValue] = useState(initialvalue || "");
	const closeRef = useRef<ElementRef<"button">>(null);

	const [isPending, startTransition] = useTransition();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(() => {
			updateUser({
				bio: value,
			})
				.then(() => {
					toast.success(`User bio updated`);
					closeRef?.current?.click();
				})
				.catch(() => {
					toast.error("Something went wrong");
				});
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"link"} size={"sm"} className="ml-auto">
					Edit
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit user bio</DialogTitle>
				</DialogHeader>

				<form onSubmit={onSubmit} className="space-y-4">
					<Textarea
						placeholder="User bio"
						onChange={(e) => {
							setValue(e.target.value);
						}}
						value={value}
						disabled={isPending}
						className="resize-none"
					/>

					<div className="flex justify-between">
						<DialogClose ref={closeRef}>
							<Button type="button" variant={"ghost"}>
								Cancel
							</Button>
						</DialogClose>
						<Button variant={"primary"} type="submit" disabled={isPending}>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
