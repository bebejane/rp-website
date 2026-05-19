import { LoginForm } from '@/app/logga-in/LoginForm';
import s from './page.module.scss';

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
