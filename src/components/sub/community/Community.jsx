import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';

export default function Community() {
	const [Post, setPost] = useState([]);
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
