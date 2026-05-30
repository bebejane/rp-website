'use client';

import { Youtube } from '@/components/common/Youtube';
import s from './PreparationGallery.module.scss';
import cn from 'classnames';

import { Ref, useEffect, useState } from 'react';
import Content from '@/components/content/Content';
import YouTube from 'react-youtube';

export function PreparationGallery({
	preparation,
}: {
	preparation: NonNullable<PreparationQuery['preparation']>;
}) {
	const [index, setIndex] = useState(1);
	const { sections } = preparation;
	const refs: (YouTube | null)[] = sections.map(() => null);

	function handleNext() {
		//@ts-ignore
		refs[index - 1]?.internalPlayer?.pauseVideo();
		setIndex(index + 1);
	}
	function handlePrev() {
		//@ts-ignore
		refs[index - 1]?.internalPlayer?.pauseVideo();
		setIndex(index - 1);
	}

	return (
		<section className={s.preparation}>
			<ul className={s.gallery}>
				{sections.map((section, i) => (
					<li key={section.id} className={i + 1 === index ? s.active : s.inactive}>
						<h2>
							{i + 1}/{sections.length}. {section.headline}
						</h2>
						{section.video && (
							<div className={s.video}>
								<Youtube providerUid={section.video.providerUid} onRef={(r) => (refs[i] = r)} />
							</div>
						)}
						<div className={cn('content', s.text)}>
							<Content content={section.text} />
						</div>
					</li>
				))}
			</ul>
			<div className={s.buttons}>
				<button className={s.prev} onClick={handlePrev} disabled={index <= 0}>
					Föregående
				</button>
				<button className={s.next} onClick={handleNext} disabled={index + 1 === sections.length}>
					Nästa
				</button>
			</div>
		</section>
	);
}
