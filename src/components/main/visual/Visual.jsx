import './Visual.scss';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export default function Visual() {
	const Vids = useSelector(store => store.youtube.data);
	const swiperOpt = useRef({
		modules: [Autoplay],
		autoplay: { delay: 4000, disableOnInteraction: true },
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		breakpoints: {
			1000: { slidesPerView: 3 }
		},
		onSwiper: swiper => {
			swiper.slideNext(300);
		}
	});

	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
				{Vids.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={data.id}>
							<div className='inner'>
								<div className='picBox'>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
									<div className='txtBox'>
										<h3>{data.snippet.title}</h3>
									</div>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
