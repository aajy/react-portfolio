import './Footer.scss';
import { FaFacebookF, FaTwitter, FaInstagramSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Footer() {
	const MemberData = useSelector(store => store.memberReducer.members);
	return (
		<footer className='Footer'>
			<h1>Dcodelab</h1>
			<p>2023 DcodeLab &copy; All Rights Reserved. </p>
			<div>{MemberData && `${MemberData[0].position} :${MemberData[0].name}`}</div>
			<ul>
				<li>
					<FaFacebookF />
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaInstagramSquare />
				</li>
			</ul>
		</footer>
	);
}
