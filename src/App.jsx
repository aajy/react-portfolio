import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';

import { Route } from 'react-router-dom';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import CookieModal from './components/common/cookieModal/CookieModal';
import Detail from './components/sub/youtube/Detail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGlobalData } from './hooks/useGlobalData';

function App() {
	const { Mode } = useGlobalData();
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`wrap ${Mode === 'light' ? 'light' : 'dark'} ${useMedia()}`}>
				<Header />
				<Route exact path='/' component={MainWrap} />
				<Route path='/department' component={Department} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/community' component={Community} />
				<Route path='/members' component={Members} />
				<Route path='/contact' component={Contact} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/detail/:id' component={Detail} />
				<Footer />
				<Menu />
				<CookieModal wid={300} ht={200}>
					<h1>쿠키팝업</h1>
				</CookieModal>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
