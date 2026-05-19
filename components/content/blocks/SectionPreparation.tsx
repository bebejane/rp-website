'use client';

import { Youtube } from '@/components/common/Youtube';
import s from './SectionPreparation.module.scss';

export type Props = {
	data: NonNullable<PreparationQuery['preparation']>['sections'][0];
};

export default function SectionPreparation({ data: { headline, video } }: Props) {
	return (
		<section className={s.preparation}>
			<h2>{headline}</h2>
			{video && <Youtube providerUid={video.providerUid} />}
		</section>
	);
}
