import s from './page.module.scss';
import { AllPostsDocument, PostDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Markdown } from 'next-dato-utils/components';
import { Link, locales } from '@/i18n/routing';
import { Image } from 'react-datocms';
import Content from '@/components/content/Content';

export default async function Post({ params }: PageProps<'/'>) {
	
	//if (!post) return notFound();

	return (
		<>
			<article>
				
			</article>
			{/* <DraftMode url={draftUrl} path={`/${locale}/posts/${slug}`} /> */}
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
