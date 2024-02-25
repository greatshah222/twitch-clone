"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
	children: React.ReactNode;
}

// this is client component but children are still server component cause we are using method of children injection

export const Container = ({ children }: ContainerProps) => {
	const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

	const isMobileScreen = useMediaQuery("(max-width:1024px)");

	useEffect(() => {
		if (isMobileScreen) {
			onCollapse();
		} else {
			onExpand();
		}
	}, [isMobileScreen, onExpand, onCollapse]);

	return (
		<div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>{children}</div>
	);
};
