"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { TransactionList } from "./TransactionList";

export function FinanceManager() {
	const router = useRouter();

	// Queries
	const { data: resumo } = api.finance.getResumo.useQuery({});

	return (
		<div className="space-y-6">
			{/* Resumo Financeiro */}
			<Card className="border-border/50 shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl">Resumo Financeiro</CardTitle>
					<CardDescription>Visão geral das suas finanças</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div className="rounded-lg bg-muted/30 p-4 text-center transition-all duration-200 hover:bg-muted/50">
							<p className="font-medium text-muted-foreground text-sm">
								Total Entradas
							</p>
							<p className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">
								R$ {resumo?.totalEntradas.toFixed(2) || "0,00"}
							</p>
						</div>
						<div className="rounded-lg bg-muted/30 p-4 text-center transition-all duration-200 hover:bg-muted/50">
							<p className="font-medium text-muted-foreground text-sm">
								Total Saídas
							</p>
							<p className="font-bold text-2xl text-red-600 dark:text-red-400">
								R$ {resumo?.totalSaidas.toFixed(2) || "0,00"}
							</p>
						</div>
						<div className="rounded-lg bg-muted/30 p-4 text-center transition-all duration-200 hover:bg-muted/50">
							<p className="font-medium text-muted-foreground text-sm">Saldo</p>
							<p
								className={`font-bold text-2xl ${(resumo?.saldo || 0) >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
							>
								R$ {(resumo?.saldo || 0).toFixed(2)}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Lista de Transações */}
			<TransactionList />
		</div>
	);
}
