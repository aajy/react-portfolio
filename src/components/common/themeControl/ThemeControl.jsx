import { useRef } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './ThemeControl.scss';

export default function ThemeControl() {
	const inputEl = useRef(null);
	const { setCookie, isCookie } = useCookie();

	//컴포넌트 마운트시 theme라는 이름의 쿠키값이 있으면
	if (isCookie('theme')) {
		//현재 쿠키값에서 'theme='다음 문자값을 가져와서 ;기준으로 배열분리한뒤 제일 첫번째값이 theme 컬러값
		//해당 쿠키 컬러값으로 자동 세팅
		document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0]);
	}
	//만약 쿠키가 없으면 그냥 css에 등록되어 있는 기본 --pointColor값 활용

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
