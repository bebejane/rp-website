import s from './page.module.scss';
import { CoachingDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Content from '@/components/content/Content';
import { buildMetadata } from '@/app/layout';
import { Metadata } from 'next';

export default async function CoachingPage() {
	const { coaching, draftUrl } = await apiQuery(CoachingDocument);
	if (!coaching) return notFound();

	return (
		<>
			<article className={s.coaching}>
				<section>
					<h1>Handledning</h1>
					<Content content={coaching.text} />
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/handledning`} />
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	return buildMetadata({
		title: 'Handledning',
		pathname: '/handledning',
	});
}
