"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";

export function TransactionList() {
	const { data: transacoes } = api.finance.getTransacoes.useQuery({
		limit: 10,
	});

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<span>📊</span>
					Últimas Transações
				</CardTitle>
				<CardDescription>
					Histórico das suas transações recentes
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{transacoes?.items.map((transacao) => (
						<div
							key={transacao.id}
							className="flex items-center justify-between rounded-lg border p-3"
						>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									{transacao.tipoEntrada && (
										<span className="text-green-600">
											{transacao.tipoEntrada.emoji}
										</span>
									)}
									{transacao.tipoSaida && (
										<span className="text-red-600">
											{transacao.tipoSaida.emoji}
										</span>
									)}
								</div>
								<div>
									<p className="font-medium">{transacao.descricao}</p>
									<div className="flex items-center gap-2 text-muted-foreground text-sm">
										<span>{formatDate(transacao.data)}</span>
										{transacao.formaPagamento && (
											<>
												<span>•</span>
												<span>
													{transacao.formaPagamento.emoji}{" "}
													{transacao.formaPagamento.name}
												</span>
											</>
										)}
									</div>
								</div>
							</div>
							<div className="text-right">
								<p
									className={`font-bold ${transacao.tipoEntrada ? "text-green-600" : "text-red-600"}`}
								>
									{transacao.tipoEntrada ? "+" : "-"}{" "}
									{formatCurrency(transacao.valor)}
								</p>
								{transacao.tipoEntrada && (
									<Badge variant="secondary" className="text-xs">
										{transacao.tipoEntrada.name}
									</Badge>
								)}
								{transacao.tipoSaida && (
									<Badge variant="secondary" className="text-xs">
										{transacao.tipoSaida.name}
									</Badge>
								)}
							</div>
						</div>
					))}

					{transacoes?.items.length === 0 && (
						<div className="py-8 text-center">
							<p className="text-muted-foreground">
								Nenhuma transação encontrada
							</p>
							<p className="text-muted-foreground text-sm">
								Adicione sua primeira transação para começar
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
