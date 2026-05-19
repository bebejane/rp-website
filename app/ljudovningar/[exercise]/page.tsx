import Content from '@/components/content/Content';
import s from './page.module.scss';
import SectionExercise from '@/components/content/blocks/SectionExercise';
import { AllExercisesDocument, ExerciseDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Aside } from '@/components/nav/Aside';

export default async function ExercisePage({ params }: PageProps<'/ljudovningar/[exercise]'>) {
	const { exercise: slug } = await params;
	const { exercise, draftUrl } = await apiQuery(ExerciseDocument, {
		variables: {
			slug,
		},
	});

	if (!exercise) return notFound();

	const { id, title, intro, section } = exercise;
	return (
		<>
			<Aside sections={section.map(({ id, headline }) => ({ id, title: headline }))} />
			<article className={s.exercises}>
				<header>
					<h1>{title}</h1>
					<Content content={intro} />
				</header>
				<section key={id}>
					{section.map((ex) => (
						<SectionExercise key={ex.id} data={ex} />
					))}
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
