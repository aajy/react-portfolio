import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ title, children }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle.current, title);
		refFrame.current.classList.add('on');
	}, []);
	return (
		<main className={`Layout ${title}`} ref={refFrame}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
		</main>
	);
}
