import { useRef, useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid, ht, children }) {
	//커스텀 훅으로부터 쿠키확인, 쿠키생성함수 가져옴
	const { isCookie, setCookie } = useCookie();
	//체크박스요소를 담을 참조객체 생성
	const CheckEl = useRef(null);
	//Close의 초기값으로 isCookie의 리턴값 담음 Close(true:쿠키없음, 팝업안보임) Close(false:쿠키없음, 팝업보임)
	const [Close, setClose] = useState(isCookie('today=done'));
	//쿠키초기화하기
	// setCookie('today', 'done', 0);

	const handleClose = () => {
		const isChecked = CheckEl.current.checked;
		//함수호출 시 체크가 되어있으면 쿠키생성
		if (isChecked) setCookie('today', 'done', 10);
		//미체크시 쿠키생성 무시하고 그냥 팝업만 닫기
		setClose(true);
	};
	return (
		<>
			{!Close && (
				<aside className='cookieModal' style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}>
					<div className='content'>{children}</div>

					<div className='controls'>
						<nav>
							<label>
								<input type='checkbox' ref={CheckEl} />
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
