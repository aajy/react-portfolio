import './Menu.scss';
export default function Menu({ Toggle, setToggle }) {
	return (
		<div className='Menu'>
			<h1 onClick={() => setToggle(!Toggle)}>Mobile Menu</h1>
		</div>
	);
}
