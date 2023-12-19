import { motion, AnimatePresence } from 'framer-motion';
import './Modal.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.modal);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, x: '-100%', scale: 0, rotate: -45 }}
					animate={{ opacity: 1, x: '0%', scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: '100%', rotate: 45 }}
					transition={{ duration: 1 }}
				>
					<div className='con'>{children}</div>
					<span onClick={() => dispatch({ type: types.MODAL.start, payload: false })}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
