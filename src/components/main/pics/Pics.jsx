import { useEffect, useRef, useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Pics.scss';

export default function Pics() {
	const { scrollFrame, getCurrentScroll } = useScroll();
	const [Scrolled, setScrolled] = useState(0);

	const thisEl = useRef(null);
	const boxEl = useRef(null);

	useEffect(() => {
		scrollFrame?.addEventListener('scroll', () => {
			setScrolled(getCurrentScroll(thisEl.current)); //getCurrentScroll에서 받는 파라미터값의 높이를 반환.
			if (Scrolled >= 0) boxEl.current.style.transform = `translateX(${Scrolled}px)`;
		});
	}, [scrollFrame, getCurrentScroll]);
	return (
		<section className='Pics myScroll' ref={thisEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
