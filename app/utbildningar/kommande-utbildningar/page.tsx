import { buildMetadata } from '@/app/layout';
import s from './page.module.scss';
import { AllUpcomingCoursesDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import Link from 'next/link';
import { Metadata } from 'next';

export default async function UpcommingCoursesPage({ params }: PageProps<'/utbildningar'>) {
	const { allUpcomingCourses, draftUrl } = await apiQuery(AllUpcomingCoursesDocument);

	return (
		<>
			<article className={s.courses}>
				<section>
					<h1>Kommande utbildningar</h1>
					<p className='intro'>
						Här listar vi alla kommande utbildningar som arrangeras av oss. Längst ner på sidan hittar du utbildningar och föreläsningar på uppdrag av andra aktörer.</p>
				</section>
				<section>
					<ul>
						{allUpcomingCourses.map(({ id, city, course, date, slug }) => (
							<li key={id}>
								<h5>{city}</h5>
								<Link href={`/utbildningar/kommande-utbildningar/${slug}`}>
									<h3>{course?.title || 'Utbildningar på uppdrag av andra aktörer'}</h3>
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

export async function generateMetadata(): Promise<Metadata> {
	return buildMetadata({
		title: 'Kommande Utbildningar',
		pathname: '/utbildningar/kommande-utbildningar',
	});
}
