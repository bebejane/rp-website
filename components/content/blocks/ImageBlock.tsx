import s from './ImageBlock.module.scss';
import { Image as DatoImage } from 'react-datocms';

export type ImageBlockProps = {
	data: ImageBlockRecord;
};

export default function ImageBlock({ data: { image } }: ImageBlockProps) {
	if (!image?.responsiveImage) return null;
	console.log(image._editingUrl);
	return (
		<figure
			className={s.image}
			data-datocms-content-link-boundary
			data-datocms-content-link-url={image._editingUrl}
		>
			<DatoImage data={image.responsiveImage} intersectionMargin='0px 0px 200% 0px' />
			{image.title && <figcaption>{image.title}</figcaption>}
		</figure>
	);
}
