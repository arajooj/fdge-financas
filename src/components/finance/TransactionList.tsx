"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/trpc/react";

export function TransactionList() {
	const { data: transacoes } = api.finance.getTransacoes.useQuery({
		limit: 5,
	});

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date(date));
	};

	return (
		<Card className="border-border/50 shadow-lg">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-xl">
					<span>📊</span>5 Transações Mais Recentes
				</CardTitle>
				<CardDescription>
					Suas transações mais recentes ordenadas por data/hora
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{transacoes?.items.map((transacao) => (
						<div
							key={transacao.id}
							className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:bg-muted/30 hover:shadow-sm"
						>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									{transacao.tipoEntrada && (
										<span className="text-emerald-600 dark:text-emerald-400">
											{transacao.tipoEntrada.emoji}
										</span>
									)}
									{transacao.tipoSaida && (
										<span className="text-red-600 dark:text-red-400">
											{transacao.tipoSaida.emoji}
										</span>
									)}
								</div>
								<div>
									<p className="font-medium">{transacao.descricao}</p>
									<div className="flex items-center gap-2 text-muted-foreground text-sm">
										<span>{formatDate(transacao.data)}</span>
										{transacao.local && (
											<>
												<span>•</span>
												<span>📍 {transacao.local.name}</span>
											</>
										)}
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
									{transacao.comprovante && (
										<div className="mt-1">
											<a
												href={transacao.comprovante}
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary text-xs transition-colors hover:underline"
											>
												📄 Ver comprovante
											</a>
											{transacao.comprovante.match(
												/\.(jpg|jpeg|png|gif|webp)$/i,
											) && (
												<div className="mt-2">
													<img
														src={transacao.comprovante}
														alt="Comprovante"
														className="h-16 w-16 rounded border border-border/50 object-cover shadow-sm"
													/>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
							<div className="text-right">
								<p
									className={`font-bold ${transacao.tipoEntrada ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
								>
									{transacao.tipoEntrada ? "+" : "-"}{" "}
									{formatCurrency(transacao.valor)}
								</p>
								<div className="flex flex-col gap-1">
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
									{transacao.isParcelada &&
										transacao.parcelaAtual &&
										transacao.totalParcelas && (
											<Badge variant="outline" className="text-xs">
												📅 {transacao.parcelaAtual}/{transacao.totalParcelas}
											</Badge>
										)}
								</div>
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
