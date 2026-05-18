'use client';

import s from './VideoBlock.module.scss';
import cn from 'classnames';
import Youtube from 'react-youtube';

export type Props = {
	data: VideoBlockRecord;
};

export default function VideoBlock({ data: { id, youtube } }: Props) {
	const { provider, providerUid } = youtube;
	return (
		<section className={cn(s.video)}>
			<Youtube
				opts={{
					playerVars: {
						autoplay: false,
						controls: 0,
						rel: 0,
					},
				}}
				videoId={providerUid}
				className={s.player}
			/>
		</section>
	);
}
