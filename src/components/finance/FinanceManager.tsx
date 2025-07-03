"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MonthSelector } from "./MonthSelector";
import { TransactionList } from "./TransactionList";

export function FinanceManager() {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(new Date());

	// Calcular início e fim do mês selecionado
	const getMonthRange = (date: Date) => {
		const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
		const endDate = new Date(
			date.getFullYear(),
			date.getMonth() + 1,
			0,
			23,
			59,
			59,
		);
		return { startDate, endDate };
	};

	const { startDate, endDate } = getMonthRange(selectedDate);

	// Queries
	const { data: resumo } = api.finance.getResumo.useQuery({
		startDate,
		endDate,
	});

	const formatPeriod = () => {
		return new Intl.DateTimeFormat("pt-BR", {
			month: "long",
			year: "numeric",
		}).format(selectedDate);
	};

	return (
		<div className="space-y-6">
			{/* Seletor de Mês */}
			<MonthSelector
				currentDate={selectedDate}
				onDateChange={setSelectedDate}
			/>

			{/* Resumo Financeiro */}
			<Card className="border-border/50 shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl">
						Resumo Financeiro - {formatPeriod()}
					</CardTitle>
					<CardDescription>
						Visão geral das suas finanças do período selecionado
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div className="rounded-lg bg-muted/30 p-4 text-center transition-all duration-200 hover:bg-muted/50">
							<p className="font-medium text-muted-foreground text-sm">
								Total Entradas
							</p>
							<p className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">
								{formatCurrency(resumo?.totalEntradas || 0)}
							</p>
						</div>
						<div className="rounded-lg bg-muted/30 p-4 text-center transition-all duration-200 hover:bg-muted/50">
							<p className="font-medium text-muted-foreground text-sm">
								Total Saídas
							</p>
							<p className="font-bold text-2xl text-red-600 dark:text-red-400">
								{formatCurrency(resumo?.totalSaidas || 0)}
							</p>
						</div>
						<div className="rounded-lg bg-muted/30 p-4 text-center transition-all duration-200 hover:bg-muted/50">
							<p className="font-medium text-muted-foreground text-sm">Saldo</p>
							<p
								className={`font-bold text-2xl ${(resumo?.saldo || 0) >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
							>
								{formatCurrency(resumo?.saldo || 0)}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Lista de Transações */}
			<TransactionList startDate={startDate} endDate={endDate} />
		</div>
	);
}
