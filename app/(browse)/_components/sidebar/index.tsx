import { getRecommended } from "@/lib/recommended";

import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = async () => {
	const recommended = await getRecommended();
	return (
		// THIS WRAPPER IS A SERVER COMPONENT ->WE USED CHILDREN METHOD FOR THIS TO MAKE IT WORK
		<Wrapper>
			{/* THIS TOGGLE IS A SERVER COMPONENT */}
			<Toggle />

			<div className="spa-y-4 pt-4 lg:pt-0">
				<Recommended data={recommended} />
			</div>
		</Wrapper>
	);
};

export const SidebarSkeleton = () => {
	return (
		<aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
			<RecommendedSkeleton />
		</aside>
	);
};
