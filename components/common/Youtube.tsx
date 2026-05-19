'use client';

import s from './Youtube.module.scss';
import { default as YoutubeComponent } from 'react-youtube';

export type Props = {
	providerUid: string;
};

export function Youtube({ providerUid }: Props) {
	return (
		<YoutubeComponent
			opts={{
				playerVars: {
					autoplay: false,
					controls: 0,
					rel: 0,
				},
			}}
			videoId={providerUid}
			className={s.video}
		/>
	);
}
