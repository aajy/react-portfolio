import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';

export default function Layout({ title, children }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);
	return (
		<main className={`Layout ${title}`} ref={refFrame}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
		</main>
	);
}
