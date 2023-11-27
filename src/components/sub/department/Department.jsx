import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Department() {
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);
	const [MemberName, setMemberName] = useState([]);
	const splitText = useSplitText();
	const splitRef0 = useRef(null);
	const splitRef1 = useRef(null);
	const splitRef2 = useRef(null);
	const splitRef3 = useRef(null);
	const splitRef4 = useRef(null);
	const splitRef5 = useRef(null);

	const path = process.env.PUBLIC_URL; //public 폴더까지의 경로를구하는 구문
	const fetchDepartmemt = () => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setMemberTit(Object.keys(json)[0]); //객체를 반복돌며 key값만 배열로 반환
				setMemberData(Object.values(json)[0]); //객체를 반복돌며 value값만 배열로 반환
				setMemberName(Object.values(json)[0].map((el) => el.name));
			});
	};
	useEffect(() => {
		fetchDepartmemt();
		MemberName.forEach((name, idx) => {
			console.log(`splitRef${idx}`);
			splitText(`splitRef${idx}`.current, name);
		});
	}, []);

	return (
		<Layout title={'Department'}>
			<h2>{`${MemberTit.charAt(0).toUpperCase() + MemberTit.slice(1)}`}</h2>
			{MemberData.map((member, idx) => {
				return (
					<article key={member + idx}>
						<div className='pic'>
							<img src={`${path}/img/${member.pic}`} alt={member.name} />
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</div>
					</article>
				);
			})}
			<div className='benefits'>
				<h2>{`${MemberTit.charAt(0).toUpperCase() + MemberTit.slice(1)}`}</h2>
				<article>
					{MemberData.map((member, idx) => {
						return (
							<span key={member + idx}>
								<em></em>
								<h3>{member.position}</h3>
								<span>
									{member.name} : Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Ratione sunt fugit quidem.
								</span>
							</span>
						);
					})}
				</article>
			</div>
			<div className='splitName'>
				{MemberName.map((name, idx) => (
					<p key={idx} ref={`splitRef${idx}`}>
						{name}
					</p>
				))}
			</div>
		</Layout>
	);
}
