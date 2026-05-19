'use client';

import s from './Menu.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import { findActiveMenuItem, findMenuItem, MenuItem } from '@/lib/menu';
import { CSSProperties, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useIsDesktop from '@/lib/hooks/useIsDesktop';
import { Squash as Hamburger } from 'hamburger-react';

type MenuProps = {
	menu: MenuItem[];
};

export function Menu({ menu: _menu }: MenuProps) {
	const pathname = usePathname();
	const [menu, setMenu] = useState<MenuItem[]>(_menu);
	const selected = findActiveMenuItem(menu, pathname);
	const [active, setActive] = useState<MenuItem['id'] | null>(
		selected?.parent ?? selected?.id ?? null,
	);
	const [activeStyle, setActiveStyle] = useState<CSSProperties | null>(null);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const isDesktop = useIsDesktop();

	function handleMouse(e: React.MouseEvent<HTMLElement>) {
		if (!isDesktop) return;
		const target = e.currentTarget as HTMLLIElement;
		const id = target.dataset.id;
		if (e.type === 'mouseenter') setActive(() => menu.find((item) => item.id === id)?.id ?? null);
		else if (e.type === 'mouseleave') setActive(null);
	}

	function handleMobileSubClick(e: React.MouseEvent<HTMLElement>) {
		if (isDesktop) return;
		const target = e.currentTarget as HTMLLIElement;
		const id = target.dataset.id as MenuItem['id'];
		setActive(active === id ? null : (id ?? null));
	}

	useEffect(() => {
		function handleDocumentMouseLeave() {
			setActive(null);
		}
		const el = document.querySelector(`[data-id="${active}"`) as HTMLLIElement;
		if (el) {
			setActiveStyle({ left: el.offsetLeft });
		} else setActiveStyle(null);
		document.addEventListener('mouseleave', handleDocumentMouseLeave);
		return () => document.removeEventListener('mouseleave', handleDocumentMouseLeave);
	}, [active]);

	useEffect(() => {
		const active = isDesktop ? null : (selected?.parent ?? selected?.id ?? null);
		setActive(active);
		setShowMobileMenu(false);
	}, [pathname, isDesktop]);

	return (
		<>
			<Link href='/' className={s.wrapper}>
				<img src='/images/logo.png' alt='logo' className={cn(s.logo, showMobileMenu && s.open)} />
				<div className={s.back}></div>
			</Link>

			<button
				className={s.hamburger}
				aria-label='Menu'
				aria-expanded={showMobileMenu}
				onClick={() => setShowMobileMenu(!showMobileMenu)}
			>
				<Hamburger
					toggled={showMobileMenu}
					toggle={setShowMobileMenu}
					size={32}
					color={showMobileMenu ? '#fcfcfc' : '#161616'}
				/>
			</button>

			<nav id='menu' className={cn(s.menu, showMobileMenu && s.show)}>
				<div className={s.wrapper}>
					<ul>
						{menu.map(({ id, title, slug, sub, split }) => (
							<li
								key={id}
								data-id={id}
								onMouseEnter={handleMouse}
								className={cn(
									split && s.split,
									active === id && s.active,
									(selected?.id === id || sub?.find(({ id: subId }) => selected?.id === subId)) &&
										s.selected,
								)}
							>
								{slug && !sub ? (
									<Link href={slug}>{title}</Link>
								) : (
									<span
										data-id={id}
										onClick={handleMobileSubClick}
										role='switch'
										aria-checked={active === id}
									>
										{title}
									</span>
								)}
								{active !== null && active === id && sub && (
									<ul
										className={s.sub}
										data-id={id}
										style={activeStyle ?? undefined}
										onMouseEnter={handleMouse}
										onMouseLeave={handleMouse}
									>
										{sub.map(({ id: subId, title, slug }) => (
											<li key={subId} className={cn(selected?.id === subId && s.selected)}>
												{slug && <Link href={slug}>{title}</Link>}
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</div>
			</nav>
		</>
	);
}
