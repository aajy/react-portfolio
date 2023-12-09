import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);
	const mapInfo = useRef([
			{
				title: '삼성역 코엑스',
				latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
				imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
				imgSize: new kakao.maps.Size(232, 99),
				imgPos: { offset: new kakao.maps.Point(116, 99) },
			},
			{
				title: '넥슨 본사',
				latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
				imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
				imgSize: new kakao.maps.Size(232, 99),
				imgPos: { offset: new kakao.maps.Point(116, 99) },
			},
			{
				title: '서울 시청',
				latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
				imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
				imgSize: new kakao.maps.Size(232, 99),
				imgPos: { offset: new kakao.maps.Point(116, 99) },
			},
		]);
	]);

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(
			mapFrame.current,
			mapInfo.current[0].latlng
		);

		const markerInstance = new kakao.maps.Marker({
			position: mapInfo.current[0].latlng,
			image: new kakao.maps.MarkerImage(
				mapInfo.current[0].imgSrc,
				mapInfo.current[0].imgSize,
				mapInfo.current[0].imgOpt
			),
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}
