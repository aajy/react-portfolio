import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCombinedText, useCustomText } from '../../../hooks/useText';

export default function Department() {
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);
	const [MemberName, setMemberName] = useState([]);
	// const splitText = useSplitText();
	// const splitRefs = MemberName.map(useRef());

	const path = useRef(process.env.PUBLIC_URL); //public 폴더까지의 경로를구하는 구문
	const changeTitle = useCustomText('title');
	const shortenText = useCustomText('shorten');
	const combinedTitle = useCustomText('combined');
	const test1 = 'our-members-score';
	console.log(combinedTitle(test1));
	const fetchDepartmemt = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setMemberTit(Object.keys(json)[0]); //객체를 반복돌며 key값만 배열로 반환
				setMemberData(Object.values(json)[0]); //객체를 반복돌며 value값만 배열로 반환
				setMemberName(Object.values(json)[0].map((el) => el.name));
			});
	};
	useEffect(() => {
		fetchDepartmemt();
		// setTimeout(() => {
		// 	MemberName.forEach((name, idx) => {
		// 		const ref = splitRefs[idx].current;
		// 		if (ref) {
		// 			splitText(ref, name);
		// 		}
		// 		// splitText(splitRefs[idx].current, name);
		// 	});
		// }, 300);
	}, []);

	return (
		<Layout title={'Department'}>
			<h2>{combinedTitle(MemberTit)}</h2>
			{MemberData.map((member, idx) => {
				return (
					<article key={member + idx}>
						<div className='pic'>
							<img
								src={`${path.current}/img/${member.pic}`}
								alt={member.name}
							/>
							<h2>{member.name}</h2>
							<p>{shortenText(member.position, 3)}</p>
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
			{/* <div className='splitName'>
				{MemberName.map((name, idx) => (
					<p key={idx} ref={splitRefs[idx]}>
						{name}
					</p>
				))}
			</div> */}
		</Layout>
	);
}
