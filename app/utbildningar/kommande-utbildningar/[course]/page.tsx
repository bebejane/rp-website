import s from './page.module.scss';
import { AllCoursesDocument, CourseDocument, UpcomingCourseDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Content from '@/components/content/Content';

export default async function ComingCoursesPage({
	params,
}: PageProps<'/utbildningar/kommande-utbildningar/[course]'>) {
	const { course: slug } = await params;

	const { upcomingCourse, draftUrl } = await apiQuery(UpcomingCourseDocument, {
		variables: {
			slug,
		},
	});
	if (!upcomingCourse) return notFound();

	return (
		<>
			<article className={s.course}>
				<section>
					<h1>{upcomingCourse.city}</h1>
					<h3>{upcomingCourse.date}</h3>
					<Content content={upcomingCourse.text} />
					<button>Läs mer om kursen här</button>
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/utbildningar/kommande-utbildningar/${slug}`} />
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/'>) {
	const { allCourses } = await apiQuery(AllCoursesDocument);
	return allCourses.map(({ slug }) => ({
		course: slug,
	}));
}
