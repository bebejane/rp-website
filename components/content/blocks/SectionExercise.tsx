'use client';

import s from './SectionExercise.module.scss';
import cn from 'classnames';
import React from 'react';
import Youtube from 'react-youtube';
import { AudioPlayer } from 'react-audio-play';

export type Props = {
	data: AllExercisesQuery['allExercises'][0]['section'][0];
};

export default function SectionExercise({ data: { id, exercise, headline } }: Props) {
	return (
		<>
			<h3>{headline}</h3>
			<ul className={s.exercise}>
				{exercise.map(({ id, title, file, youtube }) => (
					<li key={id}>
						<p>{title}</p>
						{file && <AudioPlayer key={id} src={file.url} className={s.audio} />}
						{youtube && (
							<Youtube
								key={id}
								opts={{
									playerVars: {
										autoplay: false,
										controls: 0,
										rel: 0,
									},
								}}
								videoId={youtube.providerUid}
								className={s.video}
							/>
						)}
					</li>
				))}
			</ul>
		</>
	);
}
