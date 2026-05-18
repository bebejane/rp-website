import s from './page.module.scss';
import { AllCoursesDocument, AllSupportsDocument, SupportDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { Block, DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Content from '@/components/content/Content';
import Link from 'next/link';
import { SectionApp, SectionText, VideoBlock } from '@/components/content/blocks';

export default async function SupportPage({ params }: PageProps<'/appar-och-stod/[support]'>) {
	const { support: slug } = await params;
	const { support, draftUrl } = await apiQuery(SupportDocument, {
		variables: {
			slug,
		},
	});

	if (!support) return notFound();
	const { sections } = support;

	return (
		<>
			<aside className={s.menu}>
				<h3>Genvägar</h3>
				<ul>
					{sections.map(({ id, title }) => (
						<Link key={id} href={`/appar-och-stod/${slug}#${id}`}>
							{title}
						</Link>
					))}
				</ul>
			</aside>
			<article className={s.courses}>
				<h1>Om våra utbildningar</h1>

				{sections.map((section) => (
					<Block
						key={section.id}
						data={section}
						components={{
							SectionText,
							SectionApp,
							VideoBlock,
						}}
					/>
				))}
			</article>
			<DraftMode url={draftUrl} path={`/utbildningar`} />
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/'>) {
	const { allSupports } = await apiQuery(AllSupportsDocument);
	return allSupports.map(({ slug }) => ({
		support: slug,
	}));
}
