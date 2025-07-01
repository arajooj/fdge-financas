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
import { UploadButton } from "@/lib/uploadthing";
import { api } from "@/trpc/react";
import { useState } from "react";

export function TransactionForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [tipoTransacao, setTipoTransacao] = useState<"entrada" | "saida" | "">(
		"",
	);
	const [comprovanteUrl, setComprovanteUrl] = useState<string>("");
	const [isParcelada, setIsParcelada] = useState(false);
	const [parcelaAtual, setParcelaAtual] = useState(1);
	const [totalParcelas, setTotalParcelas] = useState(2);

	// Queries
	const { data: tiposSaida } = api.finance.getTiposSaida.useQuery();
	const { data: tiposEntrada } = api.finance.getTiposEntrada.useQuery();
	const { data: formasPagamento } = api.finance.getFormasPagamento.useQuery();
	const { data: locais } = api.finance.getLocais.useQuery();

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
		const localId = formData.get("localId") as string;
		const tipoEntradaId = formData.get("tipoEntradaId") as string;
		const tipoSaidaId = formData.get("tipoSaidaId") as string;
		const formaPagamentoId = formData.get("formaPagamentoId") as string;

		await createTransacao.mutateAsync({
			descricao,
			valor,
			data,
			observacoes: observacoes || undefined,
			comprovante: comprovanteUrl || undefined,
			localId: localId || undefined,
			tipoEntradaId: tipoEntradaId || undefined,
			tipoSaidaId: tipoSaidaId || undefined,
			formaPagamentoId: formaPagamentoId || undefined,
			isParcelada,
			parcelaAtual: isParcelada ? parcelaAtual : undefined,
			totalParcelas: isParcelada ? totalParcelas : undefined,
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

							<div>
								<Label htmlFor="localId">Local</Label>
								<select
									id="localId"
									name="localId"
									className="w-full rounded-md border p-2"
								>
									<option value="">Selecione um local (opcional)</option>
									{locais?.map((local) => (
										<option key={local.id} value={local.id}>
											📍 {local.name}
										</option>
									))}
								</select>
							</div>

							<div>
								<Label>Comprovante</Label>
								<div className="space-y-2">
									<UploadButton
										endpoint="imageUploader"
										onClientUploadComplete={(res) => {
											if (res?.[0]) {
												setComprovanteUrl(res[0].url);
											}
										}}
										onUploadError={(error: Error) => {
											console.error("Upload error:", error);
										}}
										className="w-full"
									/>
									{comprovanteUrl && (
										<div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-2">
											<span className="text-green-600">✅</span>
											<span className="text-green-700 text-sm">
												Comprovante enviado com sucesso!
											</span>
										</div>
									)}
								</div>
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

							{/* Campos de Parcela */}
							<div>
								<Label className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={isParcelada}
										onChange={(e) => setIsParcelada(e.target.checked)}
										className="rounded"
									/>
									Transação Parcelada
								</Label>
							</div>

							{isParcelada && (
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="parcelaAtual">Parcela Atual</Label>
										<Input
											id="parcelaAtual"
											type="number"
											min="1"
											value={parcelaAtual}
											onChange={(e) => setParcelaAtual(Number(e.target.value))}
											placeholder="1"
										/>
									</div>
									<div>
										<Label htmlFor="totalParcelas">Total de Parcelas</Label>
										<Input
											id="totalParcelas"
											type="number"
											min="2"
											value={totalParcelas}
											onChange={(e) => setTotalParcelas(Number(e.target.value))}
											placeholder="12"
										/>
									</div>
								</div>
							)}

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
