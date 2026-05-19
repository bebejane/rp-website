import s from './page.module.scss';
import { AllUpcomingCoursesDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Content from '@/components/content/Content';
import Link from 'next/link';

export default async function UpcommingCoursesPage({ params }: PageProps<'/utbildningar'>) {
	const { allUpcomingCourses, draftUrl } = await apiQuery(AllUpcomingCoursesDocument);

	return (
		<>
			<article className={s.courses}>
				<section>
					<h1>Kommande utbildningar</h1>
					<p className='intro'>
						Här listar vi alla kommande utbildningar, klicka på dom för att läsa mer.
					</p>
				</section>
				<section>
					<ul>
						{allUpcomingCourses.map(({ id, city, course, date, slug }) => (
							<li key={id}>
								<h5>{city}</h5>
								<Link href={`/utbildningar/kommande-utbildningar/${slug}`}>
									<h3>{course?.title}</h3>
								</Link>
								<p>{date}</p>
								<Link href={`/utbildningar/kommande-utbildningar/${slug}`}>
									<button>Läs mer</button>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/utbildningar`} />
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
