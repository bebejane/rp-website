import { LoginForm } from '@/app/logga-in/LoginForm';
import s from './page.module.scss';
import { buildMetadata } from '@/app/layout';
import { Metadata } from 'next';

export default async function LoginPage({ params }: PageProps<'/logga-in'>) {
	return (
		<>
			<article className={s.login}>
				<header>
					<h1>Logga in</h1>
				</header>
				<LoginForm />
			</article>
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	return buildMetadata({
		title: 'Logga in',
		pathname: '/logga-in',
	});
}
