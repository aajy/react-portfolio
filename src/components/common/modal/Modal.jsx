import { useGlobalData } from '../../../hooks/useGlobalData';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.scss';

export default function Modal({ children }) {
	const { ModalOpen, setModalOpen } = useGlobalData();
	return (
		<AnimatePresence>
			{ModalOpen && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, x: '-100%', scale: 0, rotate: -45 }}
					animate={{ opacity: 1, x: '0%', scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: '100%', rotate: 45 }}
					transition={{ duration: 1 }}
				>
					<div className='con'>{children}</div>
					<span onClick={() => setModalOpen(false)}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
