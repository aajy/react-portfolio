import { useParams } from 'react-router-dom';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useEffect, useState } from 'react';

export default function Detail() {
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	console.log('re-render');
	console.log('YoutubeData: ', YoutubeData);
	console.log('-----------------');

	const fetchSingledata = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	};
	useEffect(() => {
		console.log('useEffect');
		fetchSingledata();
	}, []);
	return (
		<Layout title={'Detail'}>
			{YoutubeData && (
				<article>
					<div className='videoBox'>
						<iframe
							title={YoutubeData.title}
							src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}
							frameborder='0'
						></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout>
	);
}
