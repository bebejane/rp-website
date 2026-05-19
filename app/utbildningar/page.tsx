import s from './page.module.scss';
import { AllCoursesDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import Content from '@/components/content/Content';
import Link from 'next/link';
import { Aside } from '@/components/nav/Aside';
import { Metadata } from 'next';
import { buildMetadata } from '@/app/layout';

export default async function CoursesPage({ params }: PageProps<'/utbildningar'>) {
	const { allCourses, draftUrl } = await apiQuery(AllCoursesDocument);

	return (
		<>
			<Aside sections={allCourses.map(({ id, title }) => ({ id, title }))} />
			<article className={s.courses}>
				<section>
					<h1>Om våra utbildningar</h1>
					<ul className={s.section}>
						{allCourses.map(({ id, title, slug, text }) => (
							<li id={id} key={id}>
								<Link href={`/utbildningar/${slug}`}>
									<h2>{title}</h2>
								</Link>
								<div className='content'>
									<Content content={text} />
								</div>
							</li>
						))}
					</ul>
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/utbildningar`} />
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	return buildMetadata({
		title: 'Utbildningar',
		pathname: '/utbildningar',
	});
}
