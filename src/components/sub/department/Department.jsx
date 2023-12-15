import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

export default function Department() {
	const MemberData = useSelector(store => store.memberReducer.members);
	const HistoryData = Object.values(useSelector(store => store.memberHistoryReducer.history));
	const HistoryTit = Object.keys(useSelector(store => store.memberHistoryReducer))[0];

	const combinedTitle = useCustomText('combined');
	// const [HistoryTit, setHistoryTit] = useState('');
	// const [HistoryData, setHistoryData] = useState([]);
	const path = useRef(process.env.PUBLIC_URL); //public 폴더까지의 경로를구하는 구문
	const shortenText = useCustomText('shorten');

	return (
		<Layout title={'Department'}>
			<div className='historyBox'>
				<h2>{combinedTitle(HistoryTit)}</h2>
				<div className='con'>
					{HistoryData &&
						HistoryData.map((history, idx) => {
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
				{/* <h2>{combinedTitle(MemberTit)}</h2> */}
				<h2>{combinedTitle('Members')}</h2>
				<div className='con'>
					{MemberData &&
						MemberData.map((member, idx) => {
							return (
								<article key={member + idx}>
									<div className='pic'>
										<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
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
