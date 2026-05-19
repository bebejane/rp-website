import s from './page.module.scss';
import { AboutDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Content from '@/components/content/Content';
import { buildMetadata } from '@/app/layout';
import { Metadata } from 'next';

export default async function AboutPage({ params }: PageProps<'/'>) {
	const { about, draftUrl } = await apiQuery(AboutDocument);
	if (!about) return notFound();

	return (
		<>
			<article className={s.about}>
				<section>
					<h1>Om oss</h1>
					<h2>Dan Rosenqvist</h2>
					<Content content={about.text} />
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/om-oss`} />
		</>
	);
}

export async function genereateMetadata(): Promise<Metadata> {
	return buildMetadata({
		title: 'Om oss',
		pathname: '/om-oss',
	});
}
