'use client';

import s from './Aside.module.scss';
import cn from 'classnames';
import { useScrollInfo } from 'next-dato-utils/hooks';
import { useEffect, useRef, useState } from 'react';

type AsideProps = {
	sections: Array<{
		id: any;
		title?: string;
		active?: boolean;
	}>;
};

export function Aside({ sections: _sections }: AsideProps) {
	const [sections, setSections] = useState(_sections);
	const scrollingRef = useRef<boolean>(false);

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		const id = e.currentTarget.getAttribute('data-id');
		setSections((prev) => prev.map((section) => ({ ...section, active: section.id === id })));
		scrollingRef.current = true;
		setTimeout(() => (scrollingRef.current = false), 1000);
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.reverse().forEach((entry) => {
					if (!entry.isIntersecting || scrollingRef.current) return;
					if (entry.isIntersecting) {
						setSections((prev) => {
							return prev.map((section) => {
								return { ...section, active: section.id === entry.target.id };
							});
						});
					}
				});
			},
			{
				rootMargin: '0px 0px 0px 0px',
				//@ts-ignore
				trackVisibility: true,
				delay: 100,
			},
		);

		sections.forEach((section) => {
			const el = document.getElementById(section.id);
			if (!el) return;
			observer.observe(el);
		});
	}, []);

	return (
		<aside className={s.aside}>
			<h5>Genvägar</h5>
			<ul>
				{sections.map(({ id, title, active }) => (
					<li key={`${id}-${active}`}>
						<a
							href={`#${id}`}
							data-id={id}
							className={active ? s.active : undefined}
							onClick={handleClick}
						>
							{title}
						</a>
					</li>
				))}
			</ul>
		</aside>
	);
}
