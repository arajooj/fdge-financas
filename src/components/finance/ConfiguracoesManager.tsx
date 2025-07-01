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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { useState } from "react";

export function ConfiguracoesManager() {
	const [loadingStates, setLoadingStates] = useState({
		tipoSaida: false,
		tipoEntrada: false,
		formaPagamento: false,
	});

	// Queries
	const { data: tiposSaida, refetch: refetchTiposSaida } =
		api.finance.getTiposSaida.useQuery();
	const { data: tiposEntrada, refetch: refetchTiposEntrada } =
		api.finance.getTiposEntrada.useQuery();
	const { data: formasPagamento, refetch: refetchFormasPagamento } =
		api.finance.getFormasPagamento.useQuery();
	const { data: resumo } = api.finance.getResumo.useQuery({});

	// Mutations
	const createTipoSaida = api.finance.createTipoSaida.useMutation({
		onSuccess: () => {
			refetchTiposSaida();
			setLoadingStates((prev) => ({ ...prev, tipoSaida: false }));
		},
	});

	const createTipoEntrada = api.finance.createTipoEntrada.useMutation({
		onSuccess: () => {
			refetchTiposEntrada();
			setLoadingStates((prev) => ({ ...prev, tipoEntrada: false }));
		},
	});

	const createFormaPagamento = api.finance.createFormaPagamento.useMutation({
		onSuccess: () => {
			refetchFormasPagamento();
			setLoadingStates((prev) => ({ ...prev, formaPagamento: false }));
		},
	});

	const handleCreateTipoSaida = async (formData: FormData) => {
		setLoadingStates((prev) => ({ ...prev, tipoSaida: true }));
		const name = formData.get("name") as string;
		const emoji = formData.get("emoji") as string;
		const description = formData.get("description") as string;

		await createTipoSaida.mutateAsync({
			name,
			emoji: emoji || undefined,
			description: description || undefined,
		});
	};

	const handleCreateTipoEntrada = async (formData: FormData) => {
		setLoadingStates((prev) => ({ ...prev, tipoEntrada: true }));
		const name = formData.get("name") as string;
		const emoji = formData.get("emoji") as string;
		const description = formData.get("description") as string;

		await createTipoEntrada.mutateAsync({
			name,
			emoji: emoji || undefined,
			description: description || undefined,
		});
	};

	const handleCreateFormaPagamento = async (formData: FormData) => {
		setLoadingStates((prev) => ({ ...prev, formaPagamento: true }));
		const name = formData.get("name") as string;
		const emoji = formData.get("emoji") as string;
		const description = formData.get("description") as string;

		await createFormaPagamento.mutateAsync({
			name,
			emoji: emoji || undefined,
			description: description || undefined,
		});
	};

	return (
		<div className="container mx-auto space-y-6 p-6">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{/* Tipos de Saída */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<span>💸</span>
							Tipos de Saída
						</CardTitle>
						<CardDescription>
							Configure suas categorias de gastos
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm" className="w-full">
									Adicionar Tipo
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Novo Tipo de Saída</DialogTitle>
									<DialogDescription>
										Crie uma nova categoria para seus gastos
									</DialogDescription>
								</DialogHeader>
								<form action={handleCreateTipoSaida} className="space-y-4">
									<div>
										<Label htmlFor="emoji">Emoji</Label>
										<Input id="emoji" name="emoji" placeholder="💸" />
									</div>
									<div>
										<Label htmlFor="name">Nome</Label>
										<Input
											id="name"
											name="name"
											placeholder="Alimentação"
											required
										/>
									</div>
									<div>
										<Label htmlFor="description">Descrição</Label>
										<Input
											id="description"
											name="description"
											placeholder="Gastos com comida"
										/>
									</div>
									<Button
										type="submit"
										disabled={loadingStates.tipoSaida}
										className="w-full"
									>
										{loadingStates.tipoSaida ? "Criando..." : "Criar Tipo"}
									</Button>
								</form>
							</DialogContent>
						</Dialog>

						<Separator />

						<div className="space-y-2">
							{tiposSaida?.map((tipo) => (
								<div
									key={tipo.id}
									className="flex items-center justify-between rounded-lg border p-2"
								>
									<div className="flex items-center gap-2">
										<span>{tipo.emoji}</span>
										<span className="font-medium">{tipo.name}</span>
									</div>
									<Badge variant="secondary">
										R$ {(resumo?.saidasPorTipo?.[tipo.name] || 0).toFixed(2)}
									</Badge>
								</div>
							))}
							{tiposSaida?.length === 0 && (
								<p className="py-4 text-center text-muted-foreground text-sm">
									Nenhum tipo de saída configurado
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Tipos de Entrada */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<span>💰</span>
							Tipos de Entrada
						</CardTitle>
						<CardDescription>
							Configure suas categorias de receitas
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm" className="w-full">
									Adicionar Tipo
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Novo Tipo de Entrada</DialogTitle>
									<DialogDescription>
										Crie uma nova categoria para suas receitas
									</DialogDescription>
								</DialogHeader>
								<form action={handleCreateTipoEntrada} className="space-y-4">
									<div>
										<Label htmlFor="emoji-entrada">Emoji</Label>
										<Input id="emoji-entrada" name="emoji" placeholder="💰" />
									</div>
									<div>
										<Label htmlFor="name-entrada">Nome</Label>
										<Input
											id="name-entrada"
											name="name"
											placeholder="Salário"
											required
										/>
									</div>
									<div>
										<Label htmlFor="description-entrada">Descrição</Label>
										<Input
											id="description-entrada"
											name="description"
											placeholder="Renda mensal"
										/>
									</div>
									<Button
										type="submit"
										disabled={loadingStates.tipoEntrada}
										className="w-full"
									>
										{loadingStates.tipoEntrada ? "Criando..." : "Criar Tipo"}
									</Button>
								</form>
							</DialogContent>
						</Dialog>

						<Separator />

						<div className="space-y-2">
							{tiposEntrada?.map((tipo) => (
								<div
									key={tipo.id}
									className="flex items-center justify-between rounded-lg border p-2"
								>
									<div className="flex items-center gap-2">
										<span>{tipo.emoji}</span>
										<span className="font-medium">{tipo.name}</span>
									</div>
									<Badge variant="secondary">
										R$ {(resumo?.entradasPorTipo?.[tipo.name] || 0).toFixed(2)}
									</Badge>
								</div>
							))}
							{tiposEntrada?.length === 0 && (
								<p className="py-4 text-center text-muted-foreground text-sm">
									Nenhum tipo de entrada configurado
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Formas de Pagamento */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<span>💳</span>
							Formas de Pagamento
						</CardTitle>
						<CardDescription>
							Configure suas formas de pagamento
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm" className="w-full">
									Adicionar Forma
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Nova Forma de Pagamento</DialogTitle>
									<DialogDescription>
										Crie uma nova forma de pagamento
									</DialogDescription>
								</DialogHeader>
								<form action={handleCreateFormaPagamento} className="space-y-4">
									<div>
										<Label htmlFor="emoji-pagamento">Emoji</Label>
										<Input id="emoji-pagamento" name="emoji" placeholder="💳" />
									</div>
									<div>
										<Label htmlFor="name-pagamento">Nome</Label>
										<Input
											id="name-pagamento"
											name="name"
											placeholder="Cartão de Crédito"
											required
										/>
									</div>
									<div>
										<Label htmlFor="description-pagamento">Descrição</Label>
										<Input
											id="description-pagamento"
											name="description"
											placeholder="Cartão principal"
										/>
									</div>
									<Button
										type="submit"
										disabled={loadingStates.formaPagamento}
										className="w-full"
									>
										{loadingStates.formaPagamento
											? "Criando..."
											: "Criar Forma"}
									</Button>
								</form>
							</DialogContent>
						</Dialog>

						<Separator />

						<div className="space-y-2">
							{formasPagamento?.map((forma) => (
								<div
									key={forma.id}
									className="flex items-center gap-2 rounded-lg border p-2"
								>
									<span>{forma.emoji}</span>
									<span className="font-medium">{forma.name}</span>
								</div>
							))}
							{formasPagamento?.length === 0 && (
								<p className="py-4 text-center text-muted-foreground text-sm">
									Nenhuma forma de pagamento configurada
								</p>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
