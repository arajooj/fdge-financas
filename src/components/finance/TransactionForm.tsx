"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useState } from "react";

export function TransactionForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [tipoTransacao, setTipoTransacao] = useState<"entrada" | "saida" | "">(
		"",
	);

	// Queries
	const { data: tiposSaida } = api.finance.getTiposSaida.useQuery();
	const { data: tiposEntrada } = api.finance.getTiposEntrada.useQuery();
	const { data: formasPagamento } = api.finance.getFormasPagamento.useQuery();

	// Mutations
	const createTransacao = api.finance.createTransacao.useMutation({
		onSuccess: () => {
			setIsLoading(false);
			setIsOpen(false);
			// Reset form
			const form = document.getElementById(
				"transaction-form",
			) as HTMLFormElement;
			if (form) form.reset();
		},
	});

	const handleCreateTransacao = async (formData: FormData) => {
		setIsLoading(true);

		const descricao = formData.get("descricao") as string;
		const valor = Number.parseFloat(formData.get("valor") as string);
		const data = new Date(formData.get("data") as string);
		const observacoes = formData.get("observacoes") as string;
		const tipoEntradaId = formData.get("tipoEntradaId") as string;
		const tipoSaidaId = formData.get("tipoSaidaId") as string;
		const formaPagamentoId = formData.get("formaPagamentoId") as string;

		await createTransacao.mutateAsync({
			descricao,
			valor,
			data,
			observacoes: observacoes || undefined,
			tipoEntradaId: tipoEntradaId || undefined,
			tipoSaidaId: tipoSaidaId || undefined,
			formaPagamentoId: formaPagamentoId || undefined,
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<span>📝</span>
					Nova Transação
				</CardTitle>
				<CardDescription>Adicione uma nova entrada ou saída</CardDescription>
			</CardHeader>
			<CardContent>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button className="w-full">Adicionar Transação</Button>
					</DialogTrigger>
					<DialogContent className="max-w-md">
						<DialogHeader>
							<DialogTitle>Nova Transação</DialogTitle>
							<DialogDescription>
								Registre uma nova entrada ou saída
							</DialogDescription>
						</DialogHeader>
						<form
							id="transaction-form"
							action={handleCreateTransacao}
							className="space-y-4"
						>
							<div>
								<Label>Tipo de Transação</Label>
								<div className="flex gap-2">
									<Button
										type="button"
										variant={
											tipoTransacao === "entrada" ? "default" : "outline"
										}
										onClick={() => setTipoTransacao("entrada")}
									>
										Entrada
									</Button>
									<Button
										type="button"
										variant={tipoTransacao === "saida" ? "default" : "outline"}
										onClick={() => setTipoTransacao("saida")}
									>
										Saída
									</Button>
								</div>
							</div>

							<div>
								<Label htmlFor="descricao">Descrição</Label>
								<Input
									id="descricao"
									name="descricao"
									placeholder="Ex: Salário, Alimentação"
									required
								/>
							</div>

							<div>
								<Label htmlFor="valor">Valor</Label>
								<Input
									id="valor"
									name="valor"
									type="number"
									step="0.01"
									min="0"
									placeholder="0,00"
									required
								/>
							</div>

							<div>
								<Label htmlFor="data">Data</Label>
								<Input
									id="data"
									name="data"
									type="date"
									defaultValue={new Date().toISOString().split("T")[0]}
									required
								/>
							</div>

							{tipoTransacao === "entrada" && (
								<div>
									<Label htmlFor="tipoEntradaId">Tipo de Entrada</Label>
									<select
										id="tipoEntradaId"
										name="tipoEntradaId"
										className="w-full rounded-md border p-2"
										required
									>
										<option value="">Selecione um tipo de entrada</option>
										{tiposEntrada?.map((tipo) => (
											<option key={tipo.id} value={tipo.id}>
												{tipo.emoji} {tipo.name}
											</option>
										))}
									</select>
								</div>
							)}
							{tipoTransacao === "saida" && (
								<div>
									<Label htmlFor="tipoSaidaId">Tipo de Saída</Label>
									<select
										id="tipoSaidaId"
										name="tipoSaidaId"
										className="w-full rounded-md border p-2"
										required
									>
										<option value="">Selecione um tipo de saída</option>
										{tiposSaida?.map((tipo) => (
											<option key={tipo.id} value={tipo.id}>
												{tipo.emoji} {tipo.name}
											</option>
										))}
									</select>
								</div>
							)}

							<div>
								<Label htmlFor="formaPagamentoId">Forma de Pagamento</Label>
								<select
									id="formaPagamentoId"
									name="formaPagamentoId"
									className="w-full rounded-md border p-2"
								>
									<option value="">Selecione uma forma de pagamento</option>
									{formasPagamento?.map((forma) => (
										<option key={forma.id} value={forma.id}>
											{forma.emoji} {forma.name}
										</option>
									))}
								</select>
							</div>

							<div>
								<Label htmlFor="observacoes">Observações</Label>
								<Input
									id="observacoes"
									name="observacoes"
									placeholder="Observações adicionais (opcional)"
								/>
							</div>

							<Button type="submit" disabled={isLoading} className="w-full">
								{isLoading ? "Salvando..." : "Salvar Transação"}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
}
