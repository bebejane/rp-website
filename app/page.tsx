import s from './page.module.scss';
import { StartDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Content from '@/components/content/Content';

export default async function Home({ params }: PageProps<'/'>) {
	const { start, draftUrl } = await apiQuery(StartDocument);

	if (!start) return notFound();

	return (
		<>
			<article>
				<h1>Välkommen till Red Pharalope</h1>
				<section>
					<Content content={start.text} />
				</section>
				<section>
					<h2>Ladda ner våra appar</h2>
					<ul>
						<li>
							<div></div>
						</li>
					</ul>
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/`} />
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
