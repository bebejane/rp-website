import s from './page.module.scss';
import { StartDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Content from '@/components/content/Content';
import Link from 'next/link';

export default async function Home({ params }: PageProps<'/'>) {
	const { start, allUpcomingCourses, draftUrl } = await apiQuery(StartDocument);

	if (!start) return notFound();

	return (
		<>
			<article className={s.container}>
				<section className={s.intro}>
					<h1>Välkommen till Red Pharalope</h1>
					<img src='https://static.bonniernews.se/ba/54f2623a-1782-5e5f-b108-a7d6cc155b70.jpeg?width=1400&format=pjpg&auto=avif' />
					<Content className='intro' content={start.text} />
					<Link href='/utbildningar'>
						<button>Läs mer om våra utbildningar</button>
					</Link>
				</section>
				<section className={s.apps}>
					<h2>Ladda ner våra appar</h2>
					<ul className={s.apps}>
						<li>
							<div>
								<img src='/images/sov-app-logo.svg' alt='Sov app icon' />
							</div>
							<div className={s.app}>
								<h3>Samtal om våld</h3>
								<Link
									className='small'
									href='https://apps.apple.com/se/app/s-o-v-strukturen/id1644195381'
								>
									AppStore
								</Link>
								<Link
									className='small'
									href='https://play.google.com/store/apps/details?id=org.redphalarope.sov'
								>
									Google Play
								</Link>
							</div>
						</li>
						<li>
							<div>
								<img src='/images/sof-app-logo.svg' alt='Sof app icon' />
							</div>
							<div className={s.app}>
								<h3>Samtal om frihet</h3>
								<Link
									className='small'
									href='https://apps.apple.com/se/app/s-o-f-strukturen/id6743238969'
								>
									AppStore
								</Link>
								<Link
									className='small'
									href='https://play.google.com/store/apps/details?id=org.redphalarope.sof'
								>
									Google Play
								</Link>
							</div>
						</li>
					</ul>
				</section>
				<section className={s.apps}>
					<h2>Kommande utbildningar</h2>
					<ul className={s.courses}>
						{allUpcomingCourses.map(({ id, course, city, date }) => (
							<li key={id}>
								<Link href={`/utbildningar/${course?.slug}`}>
									<h5>{city}</h5>
									<h3>
										<span>{course?.title}</span>
									</h3>
									<p className='small'>{date}</p>
								</Link>
							</li>
						))}
					</ul>
					<Link href='/utbildningar/kommande-utbildningar'>
						<button>Visa alla kommande utbildningar</button>
					</Link>
				</section>
				<section className={s.logos}>
					<h2>Utvalda uppdragsgivare</h2>
					<ul>
						{start.logos.map(({ id, url, title, _editingUrl }) => (
							<li key={id}>
								<img src={url} alt={title ?? ''} data-datocms-content-link-url={_editingUrl} />
							</li>
						))}
					</ul>
				</section>
			</article>
			<DraftMode url={draftUrl} path={`/`} />
		</>
	);
}
