import s from './page.module.scss';
import { AllCoursesDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import Content from '@/components/content/Content';
import Link from 'next/link';

export default async function CoursesPage({ params }: PageProps<'/utbildningar'>) {
	const { allCourses, draftUrl } = await apiQuery(AllCoursesDocument);

	return (
		<>
			<aside className={s.menu}>
				<h5>Genvägar</h5>
				<ul>
					{allCourses.map(({ id, title, slug, text }) => (
						<Link key={id} href={`/utbildningar#${slug}`}>
							{title}
						</Link>
					))}
				</ul>
			</aside>
			<article className={s.courses}>
				<section>
					<h1>Om våra utbildningar</h1>
					<ul className={s.section}>
						{allCourses.map(({ id, title, slug, text }) => (
							<li id={slug} key={id}>
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
