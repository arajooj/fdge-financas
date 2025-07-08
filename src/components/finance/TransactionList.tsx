"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

interface TransactionListProps {
	startDate?: Date;
	endDate?: Date;
}

export function TransactionList({ startDate, endDate }: TransactionListProps) {
	// Estados para filtros
	const [filtros, setFiltros] = useState({
		tipoTransacao: "todos" as "todos" | "entrada" | "saida",
		tipoEntradaId: "todos",
		tipoSaidaId: "todos",
		formaPagamentoId: "todos",
		localId: "todos",
	});

	// Calcular datas do mês atual se não fornecidas
	const [datasMes, setDatasMes] = useState<{ startDate: Date; endDate: Date }>(
		() => {
			if (startDate && endDate) {
				return { startDate, endDate };
			}

			const hoje = new Date();
			const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
			const ultimoDiaMes = new Date(
				hoje.getFullYear(),
				hoje.getMonth() + 1,
				0,
				23,
				59,
				59,
			);

			return { startDate: primeiroDiaMes, endDate: ultimoDiaMes };
		},
	);

	// Queries para dados de filtro
	const { data: tiposEntrada } = api.finance.getTiposEntrada.useQuery();
	const { data: tiposSaida } = api.finance.getTiposSaida.useQuery();
	const { data: formasPagamento } = api.finance.getFormasPagamento.useQuery();
	const { data: locais } = api.finance.getLocais.useQuery();

	// Query para transações com filtros
	const { data: transacoes } = api.finance.getTransacoes.useQuery({
		limit: 100, // Aumentar limite para mostrar mais transações
		startDate: datasMes.startDate,
		endDate: datasMes.endDate,
		tipoTransacao:
			filtros.tipoTransacao === "todos" ? undefined : filtros.tipoTransacao,
		tipoEntradaId:
			filtros.tipoEntradaId === "todos" ? undefined : filtros.tipoEntradaId,
		tipoSaidaId:
			filtros.tipoSaidaId === "todos" ? undefined : filtros.tipoSaidaId,
		formaPagamentoId:
			filtros.formaPagamentoId === "todos"
				? undefined
				: filtros.formaPagamentoId,
		localId: filtros.localId === "todos" ? undefined : filtros.localId,
	});

	// Atualizar datas quando props mudarem
	useEffect(() => {
		if (startDate && endDate) {
			setDatasMes({ startDate, endDate });
		}
	}, [startDate, endDate]);

	// Limpar filtros específicos quando tipo de transação mudar
	useEffect(() => {
		if (filtros.tipoTransacao === "entrada") {
			setFiltros((prev) => ({ ...prev, tipoSaidaId: "todos" }));
		} else if (filtros.tipoTransacao === "saida") {
			setFiltros((prev) => ({ ...prev, tipoEntradaId: "todos" }));
		}
	}, [filtros.tipoTransacao]);

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date(date));
	};

	const formatPeriod = () => {
		const startMonth = new Intl.DateTimeFormat("pt-BR", {
			month: "long",
			year: "numeric",
		}).format(datasMes.startDate);
		return startMonth;
	};

	const limparFiltros = () => {
		setFiltros({
			tipoTransacao: "todos",
			tipoEntradaId: "todos",
			tipoSaidaId: "todos",
			formaPagamentoId: "todos",
			localId: "todos",
		});
	};

	const temFiltrosAtivos = () => {
		return Object.values(filtros).some((valor) => valor !== "todos");
	};

	return (
		<Card className="border-border/50 shadow-lg">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-xl">
					<span>📊</span>Transações - {formatPeriod()}
				</CardTitle>
				<CardDescription>
					{transacoes?.items.length || 0} transações encontradas
				</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Filtros */}
				<div className="mb-6 space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold">🔍 Filtros</h3>
						{temFiltrosAtivos() && (
							<Button
								variant="outline"
								size="sm"
								onClick={limparFiltros}
								className="text-xs"
							>
								Limpar Filtros
							</Button>
						)}
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{/* Tipo de Transação */}
						<div className="space-y-2">
							<label htmlFor="tipo-transacao" className="font-medium text-sm">
								Tipo de Transação
							</label>
							<Select
								value={filtros.tipoTransacao}
								onValueChange={(value: string) =>
									setFiltros((prev) => ({
										...prev,
										tipoTransacao: value as "todos" | "entrada" | "saida",
									}))
								}
							>
								<SelectTrigger id="tipo-transacao">
									<SelectValue placeholder="Todos os tipos" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="todos">Todos os tipos</SelectItem>
									<SelectItem value="entrada">💰 Entradas</SelectItem>
									<SelectItem value="saida">💸 Saídas</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Tipos de Entrada */}
						{filtros.tipoTransacao !== "saida" && (
							<div className="space-y-2">
								<label htmlFor="tipo-entrada" className="font-medium text-sm">
									Tipo de Entrada
								</label>
								<Select
									value={filtros.tipoEntradaId}
									onValueChange={(value: string) =>
										setFiltros((prev) => ({ ...prev, tipoEntradaId: value }))
									}
								>
									<SelectTrigger id="tipo-entrada">
										<SelectValue placeholder="Todos os tipos de entrada" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="todos">
											Todos os tipos de entrada
										</SelectItem>
										{tiposEntrada?.map((tipo) => (
											<SelectItem key={tipo.id} value={tipo.id}>
												{tipo.emoji} {tipo.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{/* Tipos de Saída */}
						{filtros.tipoTransacao !== "entrada" && (
							<div className="space-y-2">
								<label htmlFor="tipo-saida" className="font-medium text-sm">
									Tipo de Saída
								</label>
								<Select
									value={filtros.tipoSaidaId}
									onValueChange={(value: string) =>
										setFiltros((prev) => ({ ...prev, tipoSaidaId: value }))
									}
								>
									<SelectTrigger id="tipo-saida">
										<SelectValue placeholder="Todos os tipos de saída" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="todos">
											Todos os tipos de saída
										</SelectItem>
										{tiposSaida?.map((tipo) => (
											<SelectItem key={tipo.id} value={tipo.id}>
												{tipo.emoji} {tipo.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{/* Formas de Pagamento */}
						<div className="space-y-2">
							<label htmlFor="forma-pagamento" className="font-medium text-sm">
								Forma de Pagamento
							</label>
							<Select
								value={filtros.formaPagamentoId}
								onValueChange={(value: string) =>
									setFiltros((prev) => ({ ...prev, formaPagamentoId: value }))
								}
							>
								<SelectTrigger id="forma-pagamento">
									<SelectValue placeholder="Todas as formas" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="todos">Todas as formas</SelectItem>
									{formasPagamento?.map((forma) => (
										<SelectItem key={forma.id} value={forma.id}>
											{forma.emoji} {forma.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Locais */}
						<div className="space-y-2">
							<label htmlFor="local" className="font-medium text-sm">
								Local
							</label>
							<Select
								value={filtros.localId}
								onValueChange={(value: string) =>
									setFiltros((prev) => ({ ...prev, localId: value }))
								}
							>
								<SelectTrigger id="local">
									<SelectValue placeholder="Todos os locais" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="todos">Todos os locais</SelectItem>
									{locais?.map((local) => (
										<SelectItem key={local.id} value={local.id}>
											📍 {local.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				<Separator className="mb-6" />

				{/* Lista de Transações */}
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
								{temFiltrosAtivos()
									? "Tente ajustar os filtros aplicados"
									: "Adicione sua primeira transação para começar"}
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
