import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;
const fetchHihstory = async () => {
	const response = await fetch(`${path}/DB/hihstory.json`);
	const data = await response.json();
	return data.members;
};

export const useHihstoryQuery = () => {
	return useQuery(['fetchHihstory'], fetchHihstory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
