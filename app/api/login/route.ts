import { redirect } from 'next/navigation';

export async function POST(req: Request) {
	redirect('/utbildningar');
}
