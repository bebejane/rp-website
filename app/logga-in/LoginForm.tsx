'use client';
import s from './LoginForm.module.scss';
import { useState, useEffect } from 'react';

export function LoginForm() {
	const [error, setError] = useState(false);

	useEffect(() => {
		const url = new URL(window.location.href);
		const error = url.searchParams.get('error');
		if (error === 'true') setError(true);
	}, []);

	return (
		<section className={s.login}>
			<form action='/api/login' method='POST'>
				<input type='password' placeholder='Skriv in ditt lösenord' name='password' id='password' />
				<button type='submit'>Logga in</button>
			</form>
			{error && <p className={s.error}>Felaktigt lösenord</p>}
		</section>
	);
}
