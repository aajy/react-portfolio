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
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);

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
		//기존의 Post배열을 반복돌면서 파라미터로 전달된 editIndex순번의 포스트에만 enableUpdate=true라는 구분자를 추가해서 다시 state변경처리
		//다음번 렌더링때 해당 구분자가 있는 포스트객체만 수정모드로 분기처리하기 위함
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	//출력모드 변경함수
	const disableUpdate = (editIndex) => {
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
						const date = JSON.stringify(el.date);
						const strDate = changeText(date.split('T')[0].slice(1), '.');

						if (el.enableUpdate) {
							//수정모드
							return (
								<article key={el + idx}>
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
										{/* 수정모드 일때 해당 버튼 클릭시 다시 출력모드 변경 */}
										<button onClick={() => disableUpdate(idx)}>Cancel</button>
										<button onClick={() => updatePost(idx)}>Update</button>
									</nav>
								</article>
							);
						} else {
							//출력모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
										<span>{strDate}</span>
									</div>
									<nav>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						}
					})}
				</div>
			</div>
		</Layout>
	);
}
