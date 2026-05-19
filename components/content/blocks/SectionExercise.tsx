'use client';

import { Youtube } from '@/components/common/Youtube';
import s from './SectionExercise.module.scss';
import { AudioPlayer } from 'react-audio-play';

export type Props = {
	data: AllExercisesQuery['allExercises'][0]['section'][0];
};

export default function SectionExercise({ data: { id, exercise, headline } }: Props) {
	return (
		<>
			<h2>{headline}</h2>
			<ul className={s.exercise}>
				{exercise.map(({ id, title, file, youtube }) => (
					<li key={id}>
						{file && (
							<AudioPlayer
								key={id}
								src={file.url}
								className={s.audio}
								sliderColor='#015154'
								color='#015154'
							/>
						)}
						{youtube && <Youtube key={id} providerUid={youtube.providerUid} />}
						<p className='small'>{title}</p>
					</li>
				))}
			</ul>
		</>
	);
}
