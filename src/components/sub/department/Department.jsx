import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	const [HistoryTit, setHistoryTit] = useState('');
	const [HistoryData, setHistoryData] = useState([]);
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);

	const path = useRef(process.env.PUBLIC_URL); //public 폴더까지의 경로를구하는 구문
	const shortenText = useCustomText('shorten');
	const combinedTitle = useCustomText('combined');

	const fetchDepartmemt = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setMemberTit(Object.keys(json)[0]); //객체를 반복돌며 key값만 배열로 반환
				setMemberData(Object.values(json)[0]); //객체를 반복돌며 value값만 배열로 반환
			});
	};
	const fetchHistory = () => {
		fetch(`${path.current}/DB/history.json`)
			.then((data) => data.json())
			.then((json) => {
				setHistoryTit(Object.keys(json)[0]);
				setHistoryData(Object.values(json)[0]);
			});
	};
	useEffect(() => {
		fetchDepartmemt();
		fetchHistory();
	}, []);

	return (
		<Layout title={'Department'}>
			<div className='historyBox'>
				<h2>{combinedTitle(HistoryTit)}</h2>
				<div className='con'>
					{HistoryData.map((history, idx) => {
						return (
							<article key={history + idx}>
								<h3>{Object.keys(history)[0]}</h3>
								<ul>
									{Object.values(history)[0].map((txt, idx) => {
										return <li key={txt + idx}>{txt}</li>;
									})}
								</ul>
							</article>
						);
					})}
				</div>
			</div>
			<section className='memberBox'>
				<h2>{combinedTitle(MemberTit)}</h2>
				<div className='con'>
					{MemberData.map((member, idx) => {
						return (
							<article key={member + idx}>
								<div className='pic'>
									<img
										src={`${path.current}/img/${member.pic}`}
										alt={member.name}
									/>
									<h3>{member.name}</h3>
									<p>{shortenText(member.position, 3)}</p>
								</div>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
