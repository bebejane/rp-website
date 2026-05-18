import s from './page.module.scss';
import { AllCoursesDocument, CourseDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Content from '@/components/content/Content';

export default async function CoursesPage({ params }: PageProps<'/utbildningar/[course]'>) {
	const { course: slug } = await params;
	const { course, draftUrl } = await apiQuery(CourseDocument, {
		variables: {
			slug,
		},
	});
	if (!course) return notFound();

	return (
		<>
			<article className={s.course}>
				<section>
					<h1>{course.title}</h1>
					<Content content={course.text} />
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/utbildningar/${slug}`} />
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/'>) {
	const { allCourses } = await apiQuery(AllCoursesDocument);
	return allCourses.map(({ slug }) => ({
		course: slug,
	}));
}
