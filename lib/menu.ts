import { MenuDocument } from '@/graphql';
import { Route } from 'next';
import { apiQuery } from 'next-dato-utils/api';
import { stripStega } from '@datocms/content-link';

export type MenuItem = {
	id:
		| 'home'
		| 'course'
		| `course-${string}`
		| 'support'
		| `support-${string}`
		| 'audio'
		| 'audio-sof'
		| 'audio-sov'
		| 'about'
		| 'contact'
		| `login`;
	title: string;
	slug?: Route;
	split?: boolean;
	sub?: MenuItem[];
	parent?: MenuItem['id'];
};

export type Menu = MenuItem[];

export const buildMenu = async (): Promise<Menu> => {
	const { allSupports } = await apiQuery(MenuDocument);

	const menu: Menu = [
		{
			id: 'home',
			title: 'Hem',
			slug: '/',
		},
		{
			id: 'course',
			title: 'Utbildningar',
			slug: '/utbildningar',
			sub: [
				{
					id: 'course-about',
					title: 'Om våra utbildningar',
					slug: '/utbildningar',
				},
				{
					id: 'course-coming',
					title: 'Kommande utbildningar',
					slug: '/utbildningar/kommande-utbildningar',
				},
			],
		},
		{
			id: 'support',
			title: 'Appar & stöd',
			slug: '/appar-och-stod',
			sub: allSupports.map(({ id, title, slug }) => ({
				id: `support-${slug}`,
				title,
				slug: `/appar-och-stod/${slug}`,
			})),
		},
		{
			id: 'audio',
			title: 'Ljudövningar',
			slug: '/ljudovningar',
			sub: [
				{
					id: 'audio-sof',
					title: 'Samtal om frihet',
					slug: '/ljudovningar/sof',
				},
				{
					id: 'audio-sov',
					title: 'Samtal om våld',
					slug: '/ljudovningar/sov',
				},
			],
		},
		{
			id: 'about',
			title: 'Om oss',
			slug: '/om-oss',
		},
		{
			id: 'contact',
			title: 'Kontakt',
			slug: '/kontakt',
		},
		{
			id: 'login',
			split: true,
			title: 'Logga in',
			slug: '/logga-in',
		},
	];

	return stripStega(menu);
};

export const findMenuItem = (menu: Menu, pathname: string): MenuItem | null => {
	return (
		menu
			.map((item) => [item, ...(item.sub ?? [])])
			.flat()
			.find(({ slug }) => pathname === slug) ?? null
	);
};

export const findActiveMenuItem = (menu: Menu, pathname: string): MenuItem | null => {
	let item =
		findMenuItem(menu, pathname) ?? menu.find(({ slug }) => slug && pathname.startsWith(slug));
	return item ?? null;
};
