import Link from "next/link";

import ClientTabsLayout from "@/components/finance/ClientTabsLayout";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
	const session = await auth();

	if (!session?.user) {
		return (
			<HydrateClient>
				<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/20">
					<div className="space-y-6 rounded-lg border border-border/50 bg-card/50 p-8 text-center shadow-lg backdrop-blur-sm">
						<div className="space-y-2">
							<h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-bold text-5xl text-transparent">
								FDGE Finanças
							</h1>
							<p className="text-muted-foreground text-xl">
								Gerencie suas finanças pessoais de forma inteligente
							</p>
						</div>
						<Link
							href="/api/auth/signin"
							className="inline-block rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary/90 hover:shadow-xl"
						>
							Entrar no Sistema
						</Link>
					</div>
				</main>
			</HydrateClient>
		);
	}

	return (
		<HydrateClient>
			<ClientTabsLayout />
		</HydrateClient>
	);
}
