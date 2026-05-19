import { PreparationByPasswordDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const password = formData.get('password') as string;

	const { preparation } = await apiQuery(PreparationByPasswordDocument, {
		variables: {
			password,
		},
	});

	if (!preparation) return redirect('/logga-in?error=true');
	return redirect(`/logga-in/forberedelse/${preparation.slug}`);
}
