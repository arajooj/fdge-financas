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
		<div className="container mx-auto space-y-6 p-6">
			{/* Resumo Financeiro */}
			<Card>
				<CardHeader>
					<CardTitle>Resumo Financeiro</CardTitle>
					<CardDescription>Visão geral das suas finanças</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div className="text-center">
							<p className="text-muted-foreground text-sm">Total Entradas</p>
							<p className="font-bold text-2xl text-green-600">
								R$ {resumo?.totalEntradas.toFixed(2) || "0,00"}
							</p>
						</div>
						<div className="text-center">
							<p className="text-muted-foreground text-sm">Total Saídas</p>
							<p className="font-bold text-2xl text-red-600">
								R$ {resumo?.totalSaidas.toFixed(2) || "0,00"}
							</p>
						</div>
						<div className="text-center">
							<p className="text-muted-foreground text-sm">Saldo</p>
							<p
								className={`font-bold text-2xl ${(resumo?.saldo || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
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
