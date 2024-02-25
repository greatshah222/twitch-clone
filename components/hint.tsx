import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HintProps {
	label: string;
	children: React.ReactNode;
	asChild?: boolean;
	align?: "start" | "center" | "end";
	side?: "top" | "bottom" | "left" | "right";
}

export const Hint = ({ label, children, asChild, side, align }: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent className="text-black bg-white" side={side} align={align}>
					<p>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
