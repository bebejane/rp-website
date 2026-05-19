'use client';

import { Youtube } from '@/components/common/Youtube';
import s from './SectionPreparation.module.scss';
import Content from '@/components/content/Content';

export type Props = {
	data: NonNullable<PreparationQuery['preparation']>['sections'][0];
};

export default function SectionPreparation({ data: { headline, video, text } }: Props) {
	return (
		<section className={s.preparation}>
			<h2>{headline}</h2>
			{video && <Youtube providerUid={video.providerUid} />}
			<Content content={text} />
		</section>
	);
}
