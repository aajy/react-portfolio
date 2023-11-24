import './Footer.scss';
import { FaFacebookF, FaTwitter, FaInstagramSquare } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className='Footer'>
			<h1>Dcodelab</h1>
			<p>2023 DcodeLab &copy; All Rights Reserved. </p>
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
