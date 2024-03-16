import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

interface SearchPageProps {
	searchParams: {
		term?: string;
	};
}

const SearchPage = ({ searchParams: { term } }: SearchPageProps) => {
	if (!term) {
		return redirect("/");
	}

	return (
		<div className="h-full p-8 max-w-screen-2xl mx-auto">
			<Suspense fallback={<ResultsSkeleton />}>
				<Results term={term} />
			</Suspense>
		</div>
	);
};

export default SearchPage;
