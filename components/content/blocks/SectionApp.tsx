import Content from '@/components/content/Content';
import s from './SectionApp.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import { Image } from 'react-datocms';

export type Props = {
	data: SectionAppRecord;
};

export default function SectionApp({
	data: { id, title, image, text, appstore, googleplay },
}: Props) {
	return (
		<section id={id} className={cn(s.app)}>
			<div className={s.content}>
				<h2>{title}</h2>
				<Content content={text} />
				<div className={s.links}>
					<Link href={appstore ?? '/'}>
						<img src='/images/app-store.png' alt='App Store' />
					</Link>
					<Link href={googleplay ?? '/'}>
						<img src='/images/google-play.png' alt='Google Play' />
					</Link>
				</div>
			</div>
			<div className={s.image}>
				{image?.responsiveImage && <Image data={image?.responsiveImage} />}
			</div>
		</section>
	);
}
