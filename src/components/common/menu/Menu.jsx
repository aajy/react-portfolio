import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { menuClose } from '../../../redux/menuSlice';
export default function Menu() {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menu.open);
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch(menuClose());
	}, [dispatch]);
	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);
	return (
		<>
			{Open && (
				<div className='Menu'>
					<h1 onClick={() => dispatch(menuClose())}>Mobile Menu</h1>
				</div>
			)}
		</>
	);
}
