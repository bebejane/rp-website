'use client';

import { Ref } from 'react';
import s from './Youtube.module.scss';
import YouTube, { default as YoutubeComponent } from 'react-youtube';

export type Props = {
	providerUid: string;
	onRef: (r: YouTube | null) => void;
};

export function Youtube({ providerUid, onRef }: Props) {
	return (
		<div className={s.wrapper}>
			<YoutubeComponent
				opts={{
					playerVars: {
						autoplay: false,
						controls: 0,
						rel: 0,
					},
				}}
				videoId={providerUid}
				ref={(r) => {
					onRef && onRef(r);
				}}
				className={s.video}
			/>
		</div>
	);
}
