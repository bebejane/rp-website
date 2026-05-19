import SectionExercise from '@/components/content/blocks/SectionExercise';
import s from './page.module.scss';
import { AllExercisesDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
export default async function ExercisePage({ params }: PageProps<'/ljudovningar'>) {
	const { allExercises, draftUrl } = await apiQuery(AllExercisesDocument, {
		all: true,
	});

	return (
		<>
			<article className={s.exercises}>
				<section>
					<h1>Ljudövningar</h1>
				</section>
				{allExercises.map(({ id, title, section }) => (
					<section key={id}>
						<h2>{title}</h2>
						<ul>
							{section.map((ex) => (
								<SectionExercise key={ex.id} data={ex} />
							))}
						</ul>
					</section>
				))}
			</article>
			<DraftMode url={draftUrl} path={`/ljudovningar`} />
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
