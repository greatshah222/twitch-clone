import { db } from "@/lib/db";

export const getStreamByUserId = async (userId: string) => {
	// cause userid is unique in stream
	const stream = await db.stream.findUnique({
		where: {
			userId,
		},
	});
	return stream;
};
