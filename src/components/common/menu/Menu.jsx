import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Menu() {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menuReducer.menu);
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch({ type: types.MENU.start, payload: false });
	}, [dispatch]);
	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);
	return (
		<>
			{Open && (
				<div className='Menu'>
					<h1 onClick={() => dispatch({ type: types.MENU.start, payload: false })}>Mobile Menu</h1>
				</div>
			)}
		</>
	);
}
