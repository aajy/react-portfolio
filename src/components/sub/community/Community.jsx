import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';

export default function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		//로컬저장소에 post키값에 값이 있으면 parsing 해서 리턴
		if (data) return JSON.parse(data);
		//없으면 그냥 빈 배열을 리턴 (해당 컴포넌트가 젤 처음 호출될때 한번)
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());
	const colors = ['red', 'yellow', 'yellowgreen', 'orange', 'fornflowerblue'];
	const refTit = useRef(null);
	const refCon = useRef(null);
	console.log(Post);

	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};
	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPost([
			{ title: refTit.current.value, content: refCon.current.value },
			...Post,
		]);
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
						return (
							<article key={el + idx}>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
								</div>
								<nav>
									<button>Edit</button>
									<button>Delete</button>
								</nav>
							</article>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}
