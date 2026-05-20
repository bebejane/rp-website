import s from './page.module.scss';
import { DataPolicyDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Content from '@/components/content/Content';
import { buildMetadata } from '@/app/layout';
import { Metadata } from 'next';

export default async function AppPolicyPage({ params }: PageProps<'/app/dataskyddspolicy'>) {
	const { dataPolicy, draftUrl } = await apiQuery(DataPolicyDocument);
	if (!dataPolicy) return notFound();

	return (
		<>
			<article className={s.about}>
				<section>
					<h1>Integritetspolicy</h1>
					<Content content={dataPolicy.text} />
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/app/dataskyddspolicy`} />
		</>
	);
}

export async function genereateMetadata(): Promise<Metadata> {
	return buildMetadata({
		title: 'Om oss',
		pathname: '/om-oss',
	});
}
