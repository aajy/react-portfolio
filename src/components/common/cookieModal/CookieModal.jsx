import { useEffect, useState } from 'react';
import './CookieModal.scss';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid, ht, children }) {
	const [IsCheck, setIsCheck] = useState(false);
	const { ModalOpen, setModalOpen } = useGlobalData(true);
	const { isCookie, setCookie } = useCookie();

	const handleClose = () => {
		if (IsCheck) {
			setCookie('today', 'done', 10);
			setModalOpen(false);
		} else {
			setModalOpen(false);
		}
	};
	useEffect(() => {
		!isCookie('today=done') && setModalOpen(true);
	}, []);
	return (
		<>
			{ModalOpen && (
				<aside className='cookieModal' style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}>
					<div className='content'>{children}</div>

					<div className='controls'>
						<nav>
							<label>
								<input type='checkbox' onClick={() => setIsCheck(!IsCheck)} />
								오늘하루 팝업 보지 않기
							</label>
						</nav>

						<span onClick={() => handleClose()}>close</span>
					</div>
				</aside>
			)}
		</>
	);
}
