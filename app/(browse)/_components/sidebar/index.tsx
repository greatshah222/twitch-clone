import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = () => {
	return (
		// THIS WRAPPER IS A SERVER COMPONENT ->WE USED CHILDREN METHOD FOR THIS TO MAKE IT WORK
		<Wrapper>
			{/* THIS TOGGLE IS A SERVER COMPONENT */}
			<Toggle />
		</Wrapper>
	);
};
