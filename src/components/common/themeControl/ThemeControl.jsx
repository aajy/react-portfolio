import { useRef } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './ThemeControl.scss';

export default function ThemeControl() {
	const inputEl = useRef(null);
	const { setCookie } = useCookie();

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		console.log(color);
		setCookie('theme', color, 20);
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));
		document.body.style.setProperty('--pointColor', color);
	};

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} onChange={changeThemeColor} />
			{/* <button onClick={changeThemeColor}>theme color</button> */}
		</nav>
	);
}
