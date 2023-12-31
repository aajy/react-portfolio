import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Visual() {
	const num = useRef(8);
	const swipeRef = useRef(null);
	const { isSuccess, data } = useYoutubeQuery();
	const [PrevIndex, setPrevIndex] = useState(0);
	const [Index, setIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);

	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 50,
		centeredSlides: true,
		loopedSlides: num.current,
		autoplay: { delay: 2000, disableOnInteraction: true },
		breakpoints: { 1000: { slidesPerView: 2 }, 1400: { slidesPerView: 3 } },
		onSwiper: swiper => (swipeRef.current = swiper),
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(swiper.realIndex + 1);
		}
	});

	const trimTitle = title => {
		let resultTit = '';
		if (title.includes('(')) resultTit = title.split('(')[0];
		else if (title.includes('[')) resultTit = title.split('[')[0];
		else resultTit = title;
		return resultTit;
	};

	return (
		<figure className='Visual'>
			<div className='txtBox'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= num.current) return null;

							return (
								<li key={el.id} className={idx === Index ? 'on' : ''}>
									<h3>{trimTitle(el.snippet.title)}</h3>

									<Link to={`/detail/${el.id}`}>View Detail</Link>
								</li>
							);
						})}
				</ul>
			</div>

			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>

			<nav className='preview'>
				{isSuccess && (
					<>
						<p className='prevBox' onClick={() => swipeRef.current.slidePrev(400)}>
							<img src={data[PrevIndex].snippet.thumbnails.default.url} alt={data[PrevIndex].snippet.title} />
						</p>
						<p className='nextBox' onClick={() => swipeRef.current.slideNext(400)}>
							<img src={data[NextIndex].snippet.thumbnails.default.url} alt={data[NextIndex].snippet.title} />
						</p>
					</>
				)}
			</nav>

			<ul className='pagination'>
				{Array(num.current)
					.fill()
					.map((_, idx) => {
						return <li key={idx} className={idx === Index ? 'on' : ''} onClick={() => swipeRef.current.slideToLoop(idx, 400)}></li>;
					})}
			</ul>

			<div className='barFrame'>
				<p className='bar' style={{ width: (100 / num.current) * (Index + 1) + '%' }}></p>
			</div>

			<div className='counter'>
				<strong>0{Index + 1}</strong>/<span>0{num.current}</span>
			</div>
		</figure>
	);
}
