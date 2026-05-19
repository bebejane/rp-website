import { apiQuery } from 'next-dato-utils/api';
import {
	DatoCmsConfig,
	getUploadReferenceRoutes,
	getItemReferenceRoutes,
} from 'next-dato-utils/config';
import { MetadataRoute } from 'next';
import { SiteDocument, SitemapDocument } from '@/graphql';

export default {
	routes: {
		start: async () => [`/`],
		about: async () => ['/om-oss'],
		contact: async () => ['/kontakt'],
		course: async ({ slug }) => [`/utbildningar/${slug}`, '/utbildningar'],
		exercise: async ({ slug }) => [`/ljudovningar/${slug}`],
		upcoming_course: async ({ id, slug }) => [
			`/utbildningar/kommande-utbildningar/${slug}`,
			'/utbildningar/kommande-utbildningar',
			...(await getItemReferenceRoutes(id)),
		],
		preparation: async ({ slug }) => [`/logga-in/forberedelse/${slug}`],
		suoport: async ({ slug }) => [`/appar-och-stod/${slug}`],
		upload: async (record) => getUploadReferenceRoutes(record.id),
	},
	sitemap: async () => {
		const { allCourses, allExercises, allUpcomingCourses, allSupports } =
			await apiQuery(SitemapDocument);

		const staticRoutes = [
			'/',
			'/utbildningar',
			'/utbildningar/kommande-utbildningar',
			'/om-oss',
			'/kontakt',
			'/logga-in',
			'/appar-och-stod',
		].map((url) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}${url}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		}));

		const courseRoutes = allCourses.map(({ slug }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/utbildningar/${slug}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		}));

		const exerciseRoutes = allExercises.map(({ slug }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/ljudovningar/${slug}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		}));

		const upcomingCourseRoutes = allUpcomingCourses.map(({ slug }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/utbildningar/kommande-utbildningar/${slug}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		}));

		const supportRoutes = allSupports.map(({ slug }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/appar-och-stod/${slug}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		}));

		return [
			...staticRoutes,
			...courseRoutes,
			...exerciseRoutes,
			...upcomingCourseRoutes,
			...supportRoutes,
		] as MetadataRoute.Sitemap;
	},
	manifest: async () => {
		const {
			site: { globalSeo },
		} = await apiQuery(SiteDocument);
		return {
			name: 'Red Phalarope',
			short_name: 'Red Phalarope',
			description: globalSeo?.fallbackSeo?.description ?? '',
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#0d8974',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
			},
		};
	},
} satisfies DatoCmsConfig;
