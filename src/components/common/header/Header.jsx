import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Header({ setDark, isDark }) {
	const dispatch = useDispatch();
	return (
		<header className='Header'>
			<h1>
				<Link to='/'>DCODELAB</Link>
			</h1>

			<ul>
				<li>
					<NavLink to='/department' activeClassName={'on'}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName={'on'}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName={'on'}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName={'on'}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
			</ul>
			{/* <button onClick={setDark}>theme</button> */}
			<div className={`themeBox ${isDark && 'dark'}`} onClick={() => setDark(!isDark)}>
				<div className='ball'></div>
			</div>
			<button className='menuToggle' onClick={() => dispatch({ type: types.MENU.start, payload: true })}>
				menu
			</button>
		</header>
	);
}
