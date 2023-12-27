import { useParams } from 'react-router-dom';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useYoutubeQueryById } from '../../../hooks/useYoutubeQuery';

export default function Detail() {
	const { id } = useParams();
	const { data: YoutubeData, isSuccess } = useYoutubeQueryById(id);
	return (
		<Layout title={'Detail'}>
			{isSuccess && YoutubeData && (
				<article>
					<div className='videoBox'>
						<iframe title={YoutubeData.title} src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`} frameborder='0'></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout>
	);
}
