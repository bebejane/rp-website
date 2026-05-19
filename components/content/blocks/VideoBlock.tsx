'use client';

import { Youtube } from '@/components/common/Youtube';
import s from './VideoBlock.module.scss';
import cn from 'classnames';

export type Props = {
	data: VideoBlockRecord;
};

export default function VideoBlock({ data: { id, youtube } }: Props) {
	const { provider, providerUid } = youtube;
	return (
		<section className={cn(s.video)}>
			<Youtube providerUid={providerUid} />
		</section>
	);
}
