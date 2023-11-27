import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);
	const path = process.env.PUBLIC_URL; //public 폴더까지의 경로를구하는 구문
	const fetchDepartmemt = () => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setMemberTit(Object.keys(json)[0]); //객체를 반복돌며 key값만 배열로 반환
				setMemberData(Object.values(json)[0]); //객체를 반복돌며 value값만 배열로 반환
			});
	};
	useEffect(() => {
		fetchDepartmemt();
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
		</Layout>
	);
}
