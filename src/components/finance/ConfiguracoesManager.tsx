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
import type { TipoSaidas } from "@/prisma/zod";
import { api } from "@/trpc/react";
import { useState } from "react";

export function ConfiguracoesManager() {
	const [loadingStates, setLoadingStates] = useState({
		tipoSaida: false,
		tipoEntrada: false,
		formaPagamento: false,
		local: false,
	});

	const [editingItem, setEditingItem] = useState<{
		type: "tipoSaida" | "tipoEntrada" | "formaPagamento" | "local";
		id: string;
		name: string;
		emoji?: string;
		description?: string;
	} | null>(null);

	// Queries
	const { data: tiposSaida, refetch: refetchTiposSaida } =
		api.finance.getTiposSaida.useQuery();
	const { data: tiposEntrada, refetch: refetchTiposEntrada } =
		api.finance.getTiposEntrada.useQuery();
	const { data: formasPagamento, refetch: refetchFormasPagamento } =
		api.finance.getFormasPagamento.useQuery();
	const { data: locais, refetch: refetchLocais } =
		api.finance.getLocais.useQuery();
	const { data: resumo } = api.finance.getResumo.useQuery({});

	// Mutations - Create
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

	const createLocal = api.finance.createLocal.useMutation({
		onSuccess: () => {
			refetchLocais();
			setLoadingStates((prev) => ({ ...prev, local: false }));
		},
	});

	// Mutations - Update
	const updateTipoSaida = api.finance.updateTipoSaida.useMutation({
		onSuccess: () => {
			refetchTiposSaida();
			setEditingItem(null);
			setLoadingStates((prev) => ({ ...prev, tipoSaida: false }));
		},
	});

	const updateTipoEntrada = api.finance.updateTipoEntrada.useMutation({
		onSuccess: () => {
			refetchTiposEntrada();
			setEditingItem(null);
			setLoadingStates((prev) => ({ ...prev, tipoEntrada: false }));
		},
	});

	const updateFormaPagamento = api.finance.updateFormaPagamento.useMutation({
		onSuccess: () => {
			refetchFormasPagamento();
			setEditingItem(null);
			setLoadingStates((prev) => ({ ...prev, formaPagamento: false }));
		},
	});

	const updateLocal = api.finance.updateLocal.useMutation({
		onSuccess: () => {
			refetchLocais();
			setEditingItem(null);
			setLoadingStates((prev) => ({ ...prev, local: false }));
		},
	});

	// Handlers - Create
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

	const handleCreateLocal = async (formData: FormData) => {
		setLoadingStates((prev) => ({ ...prev, local: true }));
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;

		await createLocal.mutateAsync({
			name,
			description: description || undefined,
		});
	};

	// Handlers - Update
	const handleUpdateTipoSaida = async (formData: FormData) => {
		if (!editingItem) return;
		setLoadingStates((prev) => ({ ...prev, tipoSaida: true }));
		const name = formData.get("name") as string;
		const emoji = formData.get("emoji") as string;
		const description = formData.get("description") as string;

		await updateTipoSaida.mutateAsync({
			id: editingItem.id,
			name,
			emoji: emoji || undefined,
			description: description || undefined,
		});
	};

	const handleUpdateTipoEntrada = async (formData: FormData) => {
		if (!editingItem) return;
		setLoadingStates((prev) => ({ ...prev, tipoEntrada: true }));
		const name = formData.get("name") as string;
		const emoji = formData.get("emoji") as string;
		const description = formData.get("description") as string;

		await updateTipoEntrada.mutateAsync({
			id: editingItem.id,
			name,
			emoji: emoji || undefined,
			description: description || undefined,
		});
	};

	const handleUpdateFormaPagamento = async (formData: FormData) => {
		if (!editingItem) return;
		setLoadingStates((prev) => ({ ...prev, formaPagamento: true }));
		const name = formData.get("name") as string;
		const emoji = formData.get("emoji") as string;
		const description = formData.get("description") as string;

		await updateFormaPagamento.mutateAsync({
			id: editingItem.id,
			name,
			emoji: emoji || undefined,
			description: description || undefined,
		});
	};

	const handleUpdateLocal = async (formData: FormData) => {
		if (!editingItem) return;
		setLoadingStates((prev) => ({ ...prev, local: true }));
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;

		await updateLocal.mutateAsync({
			id: editingItem.id,
			name,
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
										{tipo.emoji && <span>{tipo.emoji}</span>}
										<span className="font-medium">{tipo.name}</span>
									</div>
									<div className="flex items-center gap-2">
										<Badge variant="secondary">
											R$ {(resumo?.saidasPorTipo?.[tipo.name] || 0).toFixed(2)}
										</Badge>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													size="sm"
													variant="outline"
													onClick={() =>
														setEditingItem({
															type: "tipoSaida",
															id: tipo.id,
															name: tipo.name,
															emoji: tipo.emoji || "",
															description: tipo.description || "",
														})
													}
												>
													✏️
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Editar Tipo de Saída</DialogTitle>
													<DialogDescription>
														Edite as informações do tipo de saída
													</DialogDescription>
												</DialogHeader>
												<form
													action={handleUpdateTipoSaida}
													className="space-y-4"
												>
													<div>
														<Label htmlFor="edit-emoji-saida">Emoji</Label>
														<Input
															id="edit-emoji-saida"
															name="emoji"
															defaultValue={editingItem?.emoji || ""}
															placeholder="💸"
														/>
													</div>
													<div>
														<Label htmlFor="edit-name-saida">Nome</Label>
														<Input
															id="edit-name-saida"
															name="name"
															defaultValue={editingItem?.name || ""}
															placeholder="Alimentação"
															required
														/>
													</div>
													<div>
														<Label htmlFor="edit-description-saida">
															Descrição
														</Label>
														<Input
															id="edit-description-saida"
															name="description"
															defaultValue={editingItem?.description || ""}
															placeholder="Gastos com comida"
														/>
													</div>
													<Button
														type="submit"
														disabled={loadingStates.tipoSaida}
														className="w-full"
													>
														{loadingStates.tipoSaida ? "Salvando..." : "Salvar"}
													</Button>
												</form>
											</DialogContent>
										</Dialog>
									</div>
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
										{tipo.emoji && <span>{tipo.emoji}</span>}
										<span className="font-medium">{tipo.name}</span>
									</div>
									<div className="flex items-center gap-2">
										<Badge variant="secondary">
											R${" "}
											{(resumo?.entradasPorTipo?.[tipo.name] || 0).toFixed(2)}
										</Badge>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													size="sm"
													variant="outline"
													onClick={() =>
														setEditingItem({
															type: "tipoEntrada",
															id: tipo.id,
															name: tipo.name,
															emoji: tipo.emoji || "",
															description: tipo.description || "",
														})
													}
												>
													✏️
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Editar Tipo de Entrada</DialogTitle>
													<DialogDescription>
														Edite as informações do tipo de entrada
													</DialogDescription>
												</DialogHeader>
												<form
													action={handleUpdateTipoEntrada}
													className="space-y-4"
												>
													<div>
														<Label htmlFor="edit-emoji-entrada">Emoji</Label>
														<Input
															id="edit-emoji-entrada"
															name="emoji"
															defaultValue={editingItem?.emoji || ""}
															placeholder="💰"
														/>
													</div>
													<div>
														<Label htmlFor="edit-name-entrada">Nome</Label>
														<Input
															id="edit-name-entrada"
															name="name"
															defaultValue={editingItem?.name || ""}
															placeholder="Salário"
															required
														/>
													</div>
													<div>
														<Label htmlFor="edit-description-entrada">
															Descrição
														</Label>
														<Input
															id="edit-description-entrada"
															name="description"
															defaultValue={editingItem?.description || ""}
															placeholder="Renda mensal"
														/>
													</div>
													<Button
														type="submit"
														disabled={loadingStates.tipoEntrada}
														className="w-full"
													>
														{loadingStates.tipoEntrada
															? "Salvando..."
															: "Salvar"}
													</Button>
												</form>
											</DialogContent>
										</Dialog>
									</div>
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
									className="flex items-center justify-between rounded-lg border p-2"
								>
									<div className="flex items-center gap-2">
										{forma.emoji && <span>{forma.emoji}</span>}
										<span className="font-medium">{forma.name}</span>
									</div>
									<div className="flex items-center gap-2">
										<Dialog>
											<DialogTrigger asChild>
												<Button
													size="sm"
													variant="outline"
													onClick={() =>
														setEditingItem({
															type: "formaPagamento",
															id: forma.id,
															name: forma.name,
															emoji: forma.emoji || "",
															description: forma.description || "",
														})
													}
												>
													✏️
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Editar Forma de Pagamento</DialogTitle>
													<DialogDescription>
														Edite as informações da forma de pagamento
													</DialogDescription>
												</DialogHeader>
												<form
													action={handleUpdateFormaPagamento}
													className="space-y-4"
												>
													<div>
														<Label htmlFor="edit-emoji-pagamento">Emoji</Label>
														<Input
															id="edit-emoji-pagamento"
															name="emoji"
															defaultValue={editingItem?.emoji || ""}
															placeholder="💳"
														/>
													</div>
													<div>
														<Label htmlFor="edit-name-pagamento">Nome</Label>
														<Input
															id="edit-name-pagamento"
															name="name"
															defaultValue={editingItem?.name || ""}
															placeholder="Cartão de Crédito"
															required
														/>
													</div>
													<div>
														<Label htmlFor="edit-description-pagamento">
															Descrição
														</Label>
														<Input
															id="edit-description-pagamento"
															name="description"
															defaultValue={editingItem?.description || ""}
															placeholder="Cartão principal"
														/>
													</div>
													<Button
														type="submit"
														disabled={loadingStates.formaPagamento}
														className="w-full"
													>
														{loadingStates.formaPagamento
															? "Salvando..."
															: "Salvar"}
													</Button>
												</form>
											</DialogContent>
										</Dialog>
									</div>
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

				{/* Locais */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<span>📍</span>
							Locais
						</CardTitle>
						<CardDescription>
							Configure os estabelecimentos onde você faz transações
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm" className="w-full">
									Adicionar Local
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Novo Local</DialogTitle>
									<DialogDescription>
										Crie um novo estabelecimento
									</DialogDescription>
								</DialogHeader>
								<form action={handleCreateLocal} className="space-y-4">
									<div>
										<Label htmlFor="name-local">Nome</Label>
										<Input
											id="name-local"
											name="name"
											placeholder="Supermercado ABC"
											required
										/>
									</div>
									<div>
										<Label htmlFor="description-local">Descrição</Label>
										<Input
											id="description-local"
											name="description"
											placeholder="Local onde faço compras"
										/>
									</div>
									<Button
										type="submit"
										disabled={loadingStates.local}
										className="w-full"
									>
										{loadingStates.local ? "Criando..." : "Criar Local"}
									</Button>
								</form>
							</DialogContent>
						</Dialog>

						<Separator />

						<div className="space-y-2">
							{locais?.map((local) => (
								<div
									key={local.id}
									className="flex items-center justify-between rounded-lg border p-2"
								>
									<div>
										<span className="font-medium">{local.name}</span>
										{local.description && (
											<p className="text-muted-foreground text-sm">
												{local.description}
											</p>
										)}
									</div>
									<div className="flex items-center gap-2">
										<Dialog>
											<DialogTrigger asChild>
												<Button
													size="sm"
													variant="outline"
													onClick={() =>
														setEditingItem({
															type: "local",
															id: local.id,
															name: local.name,
															description: local.description || "",
														})
													}
												>
													✏️
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Editar Local</DialogTitle>
													<DialogDescription>
														Edite as informações do local
													</DialogDescription>
												</DialogHeader>
												<form action={handleUpdateLocal} className="space-y-4">
													<div>
														<Label htmlFor="edit-name-local">Nome</Label>
														<Input
															id="edit-name-local"
															name="name"
															defaultValue={editingItem?.name || ""}
															placeholder="Supermercado ABC"
															required
														/>
													</div>
													<div>
														<Label htmlFor="edit-description-local">
															Descrição
														</Label>
														<Input
															id="edit-description-local"
															name="description"
															defaultValue={editingItem?.description || ""}
															placeholder="Local onde faço compras"
														/>
													</div>
													<Button
														type="submit"
														disabled={loadingStates.local}
														className="w-full"
													>
														{loadingStates.local ? "Salvando..." : "Salvar"}
													</Button>
												</form>
											</DialogContent>
										</Dialog>
									</div>
								</div>
							))}
							{locais?.length === 0 && (
								<p className="py-4 text-center text-muted-foreground text-sm">
									Nenhum local configurado
								</p>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
