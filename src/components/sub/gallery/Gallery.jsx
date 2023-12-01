import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const fetchFlickr = async () => {
		const num = 5;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const method_interest = 'flickr.interestingness.getList';
		const baseURL = 'https://www.flickr.com/services/rest/?method=';
		const resultURL = `${baseURL}${method_interest}&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1`;
		const data = await fetch(resultURL);
		const json = await data.json();
		console.log(json.photos.photo);
		setPics(json.photos.photo);
	};
	useEffect(() => {
		fetchFlickr();
	}, []);
	return (
		<Layout title={'Gallery'}>
			{Pics.map((pic, idx) => {
				return (
					<article key={pic.id}>
						<img
							src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
							alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
						/>
						<h2>{pic.title}</h2>
					</article>
				);
			})}
		</Layout>
	);
}
