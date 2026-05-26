import s from './page.module.scss';
import { AllCoursesDocument, CourseDocument, UpcomingCourseDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Content from '@/components/content/Content';
import { buildMetadata } from '@/app/layout';
import { Metadata } from 'next';
import Link from 'next/link';

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
					<div className='content'>
						<Content content={upcomingCourse.text} /></div>
					<Link href={`/utbildningar/kommande-utbildningar/`}>
						<button>Visa alla kommande utbildningar</button>
					</Link>
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

export async function generateMetadata({
	params,
}: PageProps<'/utbildningar/kommande-utbildningar/[course]'>): Promise<Metadata> {
	const { course: slug } = await params;
	const { upcomingCourse, draftUrl } = await apiQuery(UpcomingCourseDocument, {
		variables: {
			slug,
		},
	});

	return buildMetadata({
		title: upcomingCourse?.city,
		pathname: `/utbildningar/kommande-utbildningar/${slug}`,
	});
}
