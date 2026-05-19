import s from './ImageBlock.module.scss';
import { Image as DatoImage } from 'react-datocms';

export type ImageBlockProps = {
	data: ImageBlockRecord;
};

export default function ImageBlock({ data: { image } }: ImageBlockProps) {
	if (!image?.responsiveImage) return null;
	return (
		<figure className={s.image}>
			<DatoImage data={image.responsiveImage} intersectionMargin='0px 0px 200% 0px' />
			{image.title && <figcaption>{image.title}</figcaption>}
		</figure>
	);
}
