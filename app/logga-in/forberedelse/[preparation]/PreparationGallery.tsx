'use client';

import { Youtube } from '@/components/common/Youtube';
import s from './PreparationGallery.module.scss';

import { useState } from 'react';
import Content from '@/components/content/Content';

export function PreparationGallery({
	preparation,
}: {
	preparation: NonNullable<PreparationQuery['preparation']>;
}) {
	const [index, setIndex] = useState(1);
	const { sections } = preparation;

	return (
		<section className={s.preparation}>
			<ul className={s.gallery}>
				{sections.map((section, i) => (
					<li key={section.id} className={i + 1 === index ? s.active : s.inactive}>
						<h2>
							{i + 1}. {section.headline}
						</h2>
						{section.video && (
							<div className={s.video}>
								<Youtube providerUid={section.video.providerUid} />
							</div>
						)}
						<Content content={section.text} />
					</li>
				))}
			</ul>
			<button
				className={s.next}
				onClick={() => setIndex(index + 1)}
				disabled={index + 1 === sections.length}
			>
				Nästa
			</button>
		</section>
	);
}
