import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useSelector } from 'react-redux';

export default function Visual() {
	const youtube = useSelector(store => store.youtubeReducer.youtube);
	console.log('youtube', youtube);
	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
				}}
				loop={true}
			>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<h3>{vid.snippet.title}</h3>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
