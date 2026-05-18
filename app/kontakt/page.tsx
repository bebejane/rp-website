import s from './page.module.scss';
import { ContactDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms';
import Content from '@/components/content/Content';

export default async function ContactPage() {
	const { contact, draftUrl } = await apiQuery(ContactDocument);
	if (!contact) return notFound();
	return (
		<>
			<article className={s.contact}>
				<section>
					<h1>Kontakt</h1>
					<Content content={contact.text} />
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/`} />
		</>
	);
}
