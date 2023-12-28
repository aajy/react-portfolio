import { useCookie } from '../../../hooks/useCookie';
import { useGlobalData } from '../../../hooks/useGlobalData';
import './DarkMode.scss';

export default function DarkMode() {
	const { Dark, setDark } = useGlobalData();
	const { setCookie, isCookie } = useCookie();
	if (isCookie('dark')) setDark(document.cookie.split('dark=')[1].split(';')[0]);

	return (
		<div
			className={`DarkMode ${Dark && 'dark'}`}
			onClick={() => {
				setDark(!Dark);
				setCookie('dark', !Dark, 10);
			}}
		>
			<div className='ball'></div>
		</div>
	);
}
