import { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useHistoryQuery } from '../../../hooks/useHistoryQuery';
import { useDepartmentQuery } from '../../../hooks/useDepartmentQuery';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);
	const combinedTitle = useCustomText('combined');

	const { data: HistoryData, isSuccess: isHistory } = useHistoryQuery();
	const { data: MemberData, isSuccess: isMember } = useDepartmentQuery();

	return (
		<Layout title={'Department'}>
			<div className='historyBox'>
				<h2>{combinedTitle('History')}</h2>
				<div className='con'>
					{isHistory &&
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
				<h2>{combinedTitle('Members')}</h2>
				<div className='con'>
					{isMember &&
						MemberData.map((member, idx) => {
							return (
								<article key={member + idx}>
									<div className='pic'>
										<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
										<h3>{member.name}</h3>
										<p>{member.position}</p>
									</div>
								</article>
							);
						})}
				</div>
			</section>
		</Layout>
	);
}
