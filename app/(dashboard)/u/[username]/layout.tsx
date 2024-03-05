import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorPageLayoutProps {
	children: React.ReactNode;
	params: { username: string };
}

const CreatorPageLayout = async ({ children, params: { username } }: CreatorPageLayoutProps) => {
	const self = await getSelfByUsername(username);

	if (!self) {
		redirect("/");
	}
	return (
		<>
			<Navbar />
			<div className="flex h-full pt-20">
				<Sidebar />

				<Container>{children}</Container>
			</div>
		</>
	);
};

export default CreatorPageLayout;
