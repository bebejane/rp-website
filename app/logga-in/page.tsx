import s from './page.module.scss';

export default async function LoginPage({ params }: PageProps<'/logga-in'>) {
	return (
		<>
			<article className={s.login}>
				<header>
					<h1>Logga in</h1>
				</header>
				<section>
					<form action='/api/login' method='post'>
						<label htmlFor='email'>E-post</label>
						<input type='email' name='email' id='email' />
						<label htmlFor='password'>Lösenord</label>
						<input type='password' name='password' id='password' />
						<button type='submit'>Logga in</button>
					</form>
				</section>
			</article>
		</>
	);
}
