import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyD3MqYIo5BO0cLJy20Rw1aBXtC1qRjHSlM';
		const pid = 'PL83BY7FoUdNkZV8c6lQ7rfLk9xCTXzMYV';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.log(err);
		}
	};
	console.log('Vids', Vids);
	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<Layout title={'Youtube'}>
			{Vids.map((data, idx) => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={data.id}>
						<h2>{shortenText(data.snippet.title, 70)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className='pic'>
							<img
								src={data.snippet.thumbnails.standard.url}
								alt={data.snippet.title}
							/>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
