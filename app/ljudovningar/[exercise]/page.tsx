import s from './page.module.scss';
import SectionExercise from '@/components/content/blocks/SectionExercise';
import { AllExercisesDocument, ExerciseDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';

export default async function ExercisePage({ params }: PageProps<'/ljudovningar/[exercise]'>) {
	const { exercise: slug } = await params;
	const { exercise, draftUrl } = await apiQuery(ExerciseDocument, {
		variables: {
			slug,
		},
	});

	if (!exercise) return notFound();

	const { id, title, section } = exercise;
	return (
		<>
			<article className={s.exercises}>
				<header>
					<h1>Ljudövningar</h1>
				</header>
				<section key={id}>
					<h2>{title}</h2>
					<ul>
						{section.map((ex) => (
							<SectionExercise key={ex.id} data={ex} />
						))}
					</ul>
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/ljudovningar/${slug}`} />
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/'>) {
	const { allExercises } = await apiQuery(AllExercisesDocument);
	return allExercises.map(({ slug }) => ({
		exercise: slug,
	}));
}
