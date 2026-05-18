import s from './page.module.scss';
import { AboutDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Content from '@/components/content/Content';

export default async function AboutPage({ params }: PageProps<'/'>) {
	const { about, draftUrl } = await apiQuery(AboutDocument);
	if (!about) return notFound();

	return (
		<>
			<article>
				<section>
					<h1>Om oss</h1>
					<h2>Dan Rosenqvist</h2>
					<Content content={about.text} />
				</section>
			</article>
			{/* <DraftMode url={draftUrl} path={`/`} /> */}
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/'>) {
	// const { allPosts } = await apiQuery(AllPostsDocument, {
	// 	variables: {
	// 		locale: locale as SiteLocale,
	// 	},
	// 	all: true,
	// });
	// return allPosts.map((post) => ({
	// 	post: post.slug,
	// }));
}
