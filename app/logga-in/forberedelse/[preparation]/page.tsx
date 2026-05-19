import s from './page.module.scss';
import { AllPreparationsDocument, PreparationDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Content from '@/components/content/Content';
import { PreparationGallery } from '@/app/logga-in/forberedelse/[preparation]/PreparationGallery';

export default async function PreparationPage({
	params,
}: PageProps<'/logga-in/forberedelse/[preparation]'>) {
	const { preparation: slug } = await params;

	const { preparation, draftUrl } = await apiQuery(PreparationDocument, {
		variables: {
			slug,
		},
	});

	if (!preparation) return notFound();

	return (
		<>
			<article className={s.course}>
				<header>
					<h1>{preparation.title}</h1>
				</header>
				<section>
					<Content content={preparation.text} />
				</section>
				<PreparationGallery preparation={preparation} />
			</article>
			<DraftMode url={draftUrl} path={`/logga-in/forberedelse/${slug}`} />
		</>
	);
}

export async function generateStaticParams({ params }: PageProps<'/'>) {
	const { allPreparations } = await apiQuery(AllPreparationsDocument);
	return allPreparations.map(({ slug }) => ({
		preparation: slug,
	}));
}
