import s from './Footer.module.scss';
import cn from 'classnames';

export function Footer() {
	return (
		<footer className={cn('small', s.footer)}>
			<span>Red Phalarope AB</span>
			<span>
				<a href={'mailto:info@redphalarope.se'}>info@redphalarope.se</a>
			</span>
		</footer>
	);
}
