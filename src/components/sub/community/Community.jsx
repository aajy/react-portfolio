import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());
	const [CurNum, setCurNum] = useState(0); //페이징 버튼 클릭시 현재 보일 페이지 번호가 담길 state

	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);
	const len = useRef(0); //전체 Post갯수를 담을 참조 객체
	const pageNum = useRef(0); //전체 페이지 갯수를 추후에 연산해서 담을 참조객체
	const perNum = useRef(3); //한 페이지당 보일 포스트 갯수

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
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
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

	//글 수정 함수
	const updatePost = (updateIndex) => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 글의 제목과  본문을 모두 입력하세요.');
		}
		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	//글 삭제 함수
	const deletePost = (delIndex) => {
		//console.log(delIndex);
		//기존 map과 마찬가지로 기존 배열값을 deep copy해서 새로운배열 반환
		//이때 안쪽에 조건문을 처리해서 특정 조건에 부합되는 값만 filtering해서 리턴
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	//수정모드 변경함수
	const enableUpdate = (editIndex) => {
		if (editMode.current) return;
		editMode.current = true;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	//출력모드 변경함수
	const disableUpdate = (editIndex) => {
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	const filtering = (txt) => {
		const abc = Post.filter(
			(el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0
		);
		console.log(abc);
	};

	useEffect(() => {
		//Post데이터가 변경되면 수정모드를 강제로 false처리하면서 로컬저장소에 저장하고 컴포넌트 재실행
		Post.map((el) => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
		//전체 Post갯수 구함
		len.current = Post.length;

		//전체 페이지버튼 갯수 구하는 공식
		//전체 데이터갯수 / 한 페이지당 보일 포스트 갯수 (딱 나눠떨어지면 나눈 몫을 바로 담음)
		//전체 데이터갯수 / 한 페이지당 보일 포스트 갯수 (만약 나머지가 1,2개 남으면 나눈 몫의 1을 더한값)

		pageNum.current =
			len.current % perNum.current === 0
				? len.current / perNum.current
				: parseInt(len.current / perNum.current) + 1;
		console.log(pageNum.current);
	}, [Post]);

	return (
		<Layout title={'Community'}>
			{/* 위에서 만든 pageNum값을 활용해 자동으로 페이지버튼 생성 */}
			<nav className='pagination'>
				{Array(pageNum.current)
					.fill()
					.map((_, idx) => {
						return (
							<button key={idx} onClick={() => setCurNum(idx)}>
								{idx + 1}
							</button>
						);
					})}
			</nav>

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
						const date = JSON.stringify(el.date);
						const strDate = changeText(date.split('T')[0].slice(1), '.');

						if (
							idx >= perNum.current * CurNum &&
							idx < perNum.current * (CurNum + 1)
						) {
							return (
								<article key={el + idx}>
									{el.enableUpdate ? (
										//수정모드
										<>
											<div className='txt'>
												<input
													type='text'
													defaultValue={el.title}
													ref={refEditTit}
												/>
												<textarea
													cols='30'
													rows='4'
													defaultValue={el.content}
													ref={refEditCon}
												></textarea>
												<span>{strDate}</span>
											</div>
											<nav>
												<button onClick={() => disableUpdate(idx)}>
													Cancel
												</button>
												<button onClick={() => updatePost(idx)}>Update</button>
											</nav>
										</>
									) : (
										//출력모드
										<>
											<div className='txt'>
												<h2>{el.title}</h2>
												<p>{el.content}</p>
												<span>{strDate}</span>
											</div>
											<nav>
												<button onClick={() => enableUpdate(idx)}>Edit</button>
												<button onClick={() => deletePost(idx)}>Delete</button>
											</nav>
										</>
									)}
								</article>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		</Layout>
	);
}
