import Banner from '../banner/Banner';
import Btns from '../btns/Btns';
import Illust from '../illust/Illust';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import './MainWrap.scss';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Illust />
			<Banner />
			<Btns />
		</div>
	);
}
