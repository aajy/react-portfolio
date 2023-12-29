import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Btns() {
	//Swiper컴포넌트 안쪽에 있는 또다른 자식 컴포넌트 안쪽에서만 useSwiper hook사용가능
	//hook으로부터 생성된 객체(인스턴스)에는 다양한 prototype메서드와 property값 활용가능
	const swiper = useSwiper();

	useEffect(() => {
		swiper.init(0);
		swiper.slideNext(300);
	}, [swiper]);

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiper.slideNext(300);
					swiper.autoplay.start();
				}}
			>
				start
			</button>
			<button onClick={() => swiper.autoplay.stop()}>stop</button>
		</nav>
	);
}

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	const shortenText = useCustomText('shorten');

	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: true
				}}
				loop={true}
			>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<div className='picBox'>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
								</div>
								<div className='txtBox'>
									<h2>{shortenText(vid.snippet.title, 50)}</h2>
									<Link to={`/detail/${vid.id}`}> View Detail </Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}

				<Btns />
			</Swiper>
		</figure>
	);
}
