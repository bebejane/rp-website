import Content from '@/components/content/Content';
import s from './SectionText.module.scss';
import cn from 'classnames';

export type Props = {
	data: SectionTextRecord;
};

export default function SectionText({ data: { id, content, title } }: Props) {
	return (
		<section className={cn(s.text)}>
			<h2>{title}</h2>
			<Content content={content} />
		</section>
	);
}
