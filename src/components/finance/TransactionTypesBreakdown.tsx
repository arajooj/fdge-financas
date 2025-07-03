"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface TransactionTypesBreakdownProps {
	entradasPorTipo: Record<string, number>;
	saidasPorTipo: Record<string, number>;
	selectedDate: Date;
}

export function TransactionTypesBreakdown({
	entradasPorTipo,
	saidasPorTipo,
	selectedDate,
}: TransactionTypesBreakdownProps) {
	const formatPeriod = () => {
		return new Intl.DateTimeFormat("pt-BR", {
			month: "long",
			year: "numeric",
		}).format(selectedDate);
	};

	const totalEntradas = Object.values(entradasPorTipo).reduce(
		(sum, valor) => sum + valor,
		0,
	);
	const totalSaidas = Object.values(saidasPorTipo).reduce(
		(sum, valor) => sum + valor,
		0,
	);

	const sortedEntradas = Object.entries(entradasPorTipo)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 5); // Top 5

	const sortedSaidas = Object.entries(saidasPorTipo)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 5); // Top 5

	return (
		<Card className="border-border/50 shadow-lg">
			<CardHeader>
				<CardTitle className="text-xl">
					Gastos por Categoria - {formatPeriod()}
				</CardTitle>
				<CardDescription>
					Distribuição dos seus gastos e receitas por tipo de transação
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{/* Entradas */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="font-semibold text-emerald-600 dark:text-emerald-400">
								💰 Entradas
							</h3>
							<Badge
								variant="secondary"
								className="text-emerald-600 dark:text-emerald-400"
							>
								{formatCurrency(totalEntradas)}
							</Badge>
						</div>

						{sortedEntradas.length > 0 ? (
							<div className="space-y-3">
								{sortedEntradas.map(([tipo, valor]) => {
									const percentage =
										totalEntradas > 0 ? (valor / totalEntradas) * 100 : 0;
									return (
										<div key={tipo} className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span className="font-medium">{tipo}</span>
												<span className="font-semibold text-emerald-600 dark:text-emerald-400">
													{formatCurrency(valor)}
												</span>
											</div>
											<div className="h-2 w-full rounded-full bg-muted">
												<div
													className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
													style={{ width: `${percentage}%` }}
												/>
											</div>
											<div className="flex justify-between text-muted-foreground text-xs">
												<span>{percentage.toFixed(1)}% do total</span>
												<span>{valor.toLocaleString("pt-BR")} reais</span>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className="py-4 text-center text-muted-foreground">
								<p>Nenhuma entrada registrada</p>
							</div>
						)}
					</div>

					{/* Saídas */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="font-semibold text-red-600 dark:text-red-400">
								💸 Saídas
							</h3>
							<Badge
								variant="secondary"
								className="text-red-600 dark:text-red-400"
							>
								{formatCurrency(totalSaidas)}
							</Badge>
						</div>

						{sortedSaidas.length > 0 ? (
							<div className="space-y-3">
								{sortedSaidas.map(([tipo, valor]) => {
									const percentage =
										totalSaidas > 0 ? (valor / totalSaidas) * 100 : 0;
									return (
										<div key={tipo} className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span className="font-medium">{tipo}</span>
												<span className="font-semibold text-red-600 dark:text-red-400">
													{formatCurrency(valor)}
												</span>
											</div>
											<div className="h-2 w-full rounded-full bg-muted">
												<div
													className="h-2 rounded-full bg-red-500 transition-all duration-300"
													style={{ width: `${percentage}%` }}
												/>
											</div>
											<div className="flex justify-between text-muted-foreground text-xs">
												<span>{percentage.toFixed(1)}% do total</span>
												<span>{valor.toLocaleString("pt-BR")} reais</span>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className="py-4 text-center text-muted-foreground">
								<p>Nenhuma saída registrada</p>
							</div>
						)}
					</div>
				</div>

				{/* Resumo Rápido */}
				<Separator className="my-6" />
				<div className="grid grid-cols-2 gap-4 text-center">
					<div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/20">
						<p className="text-muted-foreground text-sm">Total Entradas</p>
						<p className="font-bold text-emerald-600 dark:text-emerald-400">
							{formatCurrency(totalEntradas)}
						</p>
					</div>
					<div className="rounded-lg bg-red-50 p-3 dark:bg-red-950/20">
						<p className="text-muted-foreground text-sm">Total Saídas</p>
						<p className="font-bold text-red-600 dark:text-red-400">
							{formatCurrency(totalSaidas)}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
