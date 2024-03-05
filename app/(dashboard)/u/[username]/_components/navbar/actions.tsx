import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Clapperboard, LogOut } from "lucide-react";

export const Actions = () => {
	return (
		<div className="flex items-center justify-end gap-x-2">
			<Button
				asChild
				size={"sm"}
				variant={"ghost"}
				className="text-muted-foreground hover:text-primary"
			>
				<Link href={"/"}>
					<LogOut className="h-5 w-5 mr-2" />
					Exit
				</Link>
			</Button>

			<UserButton afterSignOutUrl="/" />
		</div>
	);
};
