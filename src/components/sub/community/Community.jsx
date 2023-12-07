import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	//추후에 가져올 시간값에서 -을 .으로 변경하기 위해서 combined타입의 텍스트변환 함수를 텍스트관력 훅으로부터 활성화
	const changeText = useCustomText('combined');
	console.log('changeText: ', changeText);
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());
	const refTit = useRef(null);
	const refCon = useRef(null);

	//input 초기화 함수
	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	//글 저장 함수
	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		//기존 시간인스턴스값을 한국시에 맞게 변경
		//new Date().toLocalString(): 해당 지역의 표준시로 변환 (단점, 원하지 않는 방향으로 가공됨)
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		//한국시로 변환된 시간 객체값을 date키값에 추가로 등록해서 State에 저장
		setPost([
			{
				title: refTit.current.value,
				content: refCon.current.value,
				date: new Date(korTime),
			},
			...Post,
		]);
		resetPost();
	};

	//글 삭제 함수
	const deletePost = (delIndex) => {
		//console.log(delIndex);
		//기존 map과 마찬가지로 기존 배열값을 deep copy해서 새로운배열 반환
		//이때 안쪽에 조건문을 처리해서 특정 조건에 부합되는 값만 filtering해서 리턴
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	const filtering = (txt) => {
		const abc = Post.filter(
			(el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0
		);
		console.log(abc);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='title' ref={refTit} />
					<textarea
						cols='30'
						rows='3'
						placeholder='content'
						ref={refCon}
					></textarea>

					<nav>
						<button onClick={resetPost}>
							<ImCancelCircle />
						</button>
						<button onClick={createPost}>
							<TfiWrite />
						</button>
					</nav>
				</div>
				<div className='showBox'>
					{Post.map((el, idx) => {
						//시간값을 getLocalDate함수를 통해서 시간인스턴스객체값을 객체상태로 그대로 JSX안쪽의 {}에 넣을 수 없으므로
						//변환된 시간 객체값을 다시 강제로 문자화
						const date = JSON.stringify(el.date);
						//문자화시킨 값에서 먼저 T기점으로 앞의 시간문자를 찾고 다시 맨앞의 "를 제외한 나머지 문자 반환(년도-월-일)
						//반환된 문자값을 다시 changeText의 인수로 전달해서 (년도.월.일)로 변환
						const strDate = changeText(date.split('T')[0].slice(1), '.');
						console.log(strDate);

						return (
							<article key={el + idx}>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
									{/* 변환된 날자값 최종 출력 */}
									<span>{strDate}</span>
								</div>
								<nav>
									<button onClick={() => filtering('c')}>Edit</button>
									<button onClick={() => deletePost(idx)}>Delete</button>
								</nav>
							</article>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}
