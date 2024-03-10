"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
	value: string | null;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);

	const onCopy = () => {
		if (!value) return;

		setIsCopied(true);

		navigator.clipboard.writeText(value);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};

	const Icon = isCopied ? CheckCheck : Copy;
	return (
		<Button variant={"ghost"} size={"sm"} onClick={onCopy} disabled={!value || isCopied}>
			<Icon className="w-4 h-4" />
		</Button>
	);
};
