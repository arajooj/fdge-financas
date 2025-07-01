import Link from "next/link";

import { FinanceManager } from "@/components/finance/FinanceManager";
import { auth } from "@/server/auth";
import { HydrateClient, api } from "@/trpc/server";

export default async function Home() {
	const session = await auth();

	if (!session?.user) {
		return (
			<HydrateClient>
				<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
					<div className="space-y-4 text-center">
						<h1 className="font-bold text-4xl">FDGE Finanças</h1>
						<p className="text-xl">Gerencie suas finanças pessoais</p>
						<Link
							href="/api/auth/signin"
							className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-purple-900 transition-colors hover:bg-gray-100"
						>
							Entrar
						</Link>
					</div>
				</main>
			</HydrateClient>
		);
	}

	return (
		<HydrateClient>
			<main className="min-h-screen bg-gray-50">
				<FinanceManager />
			</main>
		</HydrateClient>
	);
}
