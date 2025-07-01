import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const financeRouter = createTRPCRouter({
	// ===== TIPOS DE SAÍDAS =====

	// Criar tipo de saída
	createTipoSaida: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1, "Nome é obrigatório"),
				emoji: z.string().optional(),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const tipoSaida = await ctx.db.tipoSaidas.create({
				data: {
					name: input.name,
					emoji: input.emoji,
					description: input.description,
					userId,
				},
			});

			return tipoSaida;
		}),

	// Listar tipos de saída do usuário
	getTiposSaida: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;

		const tiposSaida = await ctx.db.tipoSaidas.findMany({
			where: { userId },
			orderBy: { name: "asc" },
		});

		return tiposSaida;
	}),

	// Atualizar tipo de saída
	updateTipoSaida: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1, "Nome é obrigatório"),
				emoji: z.string().optional(),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			// Verificar se o tipo pertence ao usuário
			const existingTipo = await ctx.db.tipoSaidas.findFirst({
				where: { id: input.id, userId },
			});

			if (!existingTipo) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Tipo de saída não encontrado",
				});
			}

			const tipoSaida = await ctx.db.tipoSaidas.update({
				where: { id: input.id },
				data: {
					name: input.name,
					emoji: input.emoji,
					description: input.description,
				},
			});

			return tipoSaida;
		}),

	// Deletar tipo de saída
	deleteTipoSaida: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			// Verificar se o tipo pertence ao usuário
			const existingTipo = await ctx.db.tipoSaidas.findFirst({
				where: { id: input.id, userId },
			});

			if (!existingTipo) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Tipo de saída não encontrado",
				});
			}

			await ctx.db.tipoSaidas.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),

	// ===== TIPOS DE ENTRADAS =====

	// Criar tipo de entrada
	createTipoEntrada: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1, "Nome é obrigatório"),
				emoji: z.string().optional(),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const tipoEntrada = await ctx.db.tipoEntradas.create({
				data: {
					name: input.name,
					emoji: input.emoji,
					description: input.description,
					userId,
				},
			});

			return tipoEntrada;
		}),

	// Listar tipos de entrada do usuário
	getTiposEntrada: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;

		const tiposEntrada = await ctx.db.tipoEntradas.findMany({
			where: { userId },
			orderBy: { name: "asc" },
		});

		return tiposEntrada;
	}),

	// Atualizar tipo de entrada
	updateTipoEntrada: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1, "Nome é obrigatório"),
				emoji: z.string().optional(),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			// Verificar se o tipo pertence ao usuário
			const existingTipo = await ctx.db.tipoEntradas.findFirst({
				where: { id: input.id, userId },
			});

			if (!existingTipo) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Tipo de entrada não encontrado",
				});
			}

			const tipoEntrada = await ctx.db.tipoEntradas.update({
				where: { id: input.id },
				data: {
					name: input.name,
					emoji: input.emoji,
					description: input.description,
				},
			});

			return tipoEntrada;
		}),

	// Deletar tipo de entrada
	deleteTipoEntrada: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			// Verificar se o tipo pertence ao usuário
			const existingTipo = await ctx.db.tipoEntradas.findFirst({
				where: { id: input.id, userId },
			});

			if (!existingTipo) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Tipo de entrada não encontrado",
				});
			}

			await ctx.db.tipoEntradas.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),

	// ===== FORMAS DE PAGAMENTO =====

	// Criar forma de pagamento
	createFormaPagamento: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1, "Nome é obrigatório"),
				emoji: z.string().optional(),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const formaPagamento = await ctx.db.formasPagamento.create({
				data: {
					name: input.name,
					emoji: input.emoji,
					description: input.description,
					userId,
				},
			});

			return formaPagamento;
		}),

	// Listar formas de pagamento do usuário
	getFormasPagamento: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session.user.id;

		const formasPagamento = await ctx.db.formasPagamento.findMany({
			where: { userId },
			orderBy: { name: "asc" },
		});

		return formasPagamento;
	}),

	// Atualizar forma de pagamento
	updateFormaPagamento: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1, "Nome é obrigatório"),
				emoji: z.string().optional(),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			// Verificar se a forma pertence ao usuário
			const existingForma = await ctx.db.formasPagamento.findFirst({
				where: { id: input.id, userId },
			});

			if (!existingForma) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Forma de pagamento não encontrada",
				});
			}

			const formaPagamento = await ctx.db.formasPagamento.update({
				where: { id: input.id },
				data: {
					name: input.name,
					emoji: input.emoji,
					description: input.description,
				},
			});

			return formaPagamento;
		}),

	// Deletar forma de pagamento
	deleteFormaPagamento: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			// Verificar se a forma pertence ao usuário
			const existingForma = await ctx.db.formasPagamento.findFirst({
				where: { id: input.id, userId },
			});

			if (!existingForma) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Forma de pagamento não encontrada",
				});
			}

			await ctx.db.formasPagamento.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),

	// ===== TRANSAÇÕES =====

	// Criar transação
	createTransacao: protectedProcedure
		.input(
			z.object({
				descricao: z.string().min(1, "Descrição é obrigatória"),
				valor: z.number().positive("Valor deve ser positivo"),
				data: z.date(),
				observacoes: z.string().optional(),
				tipoEntradaId: z.string().optional(),
				tipoSaidaId: z.string().optional(),
				formaPagamentoId: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			// Verificar se pelo menos um tipo foi informado
			if (!input.tipoEntradaId && !input.tipoSaidaId) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Deve informar um tipo de entrada ou saída",
				});
			}

			// Verificar se os tipos pertencem ao usuário
			if (input.tipoEntradaId) {
				const tipoEntrada = await ctx.db.tipoEntradas.findFirst({
					where: { id: input.tipoEntradaId, userId },
				});
				if (!tipoEntrada) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Tipo de entrada não encontrado",
					});
				}
			}

			if (input.tipoSaidaId) {
				const tipoSaida = await ctx.db.tipoSaidas.findFirst({
					where: { id: input.tipoSaidaId, userId },
				});
				if (!tipoSaida) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Tipo de saída não encontrado",
					});
				}
			}

			if (input.formaPagamentoId) {
				const formaPagamento = await ctx.db.formasPagamento.findFirst({
					where: { id: input.formaPagamentoId, userId },
				});
				if (!formaPagamento) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Forma de pagamento não encontrada",
					});
				}
			}

			const transacao = await ctx.db.transacao.create({
				data: {
					descricao: input.descricao,
					valor: input.valor,
					data: input.data,
					observacoes: input.observacoes,
					tipoEntradaId: input.tipoEntradaId,
					tipoSaidaId: input.tipoSaidaId,
					formaPagamentoId: input.formaPagamentoId,
					userId,
				},
				include: {
					tipoEntrada: true,
					tipoSaida: true,
					formaPagamento: true,
				},
			});

			return transacao;
		}),

	// Listar transações do usuário
	getTransacoes: protectedProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(20),
				cursor: z.string().nullish(),
				startDate: z.date().optional(),
				endDate: z.date().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const where: Prisma.TransacaoWhereInput = { userId };

			if (input.startDate || input.endDate) {
				where.data = {};
				if (input.startDate) where.data.gte = input.startDate;
				if (input.endDate) where.data.lte = input.endDate;
			}

			const items = await ctx.db.transacao.findMany({
				take: input.limit + 1,
				where,
				cursor: input.cursor ? { id: input.cursor } : undefined,
				orderBy: { data: "desc" },
				include: {
					tipoEntrada: true,
					tipoSaida: true,
					formaPagamento: true,
				},
			});

			let nextCursor: typeof input.cursor | undefined = undefined;
			if (items.length > input.limit) {
				const nextItem = items.pop();
				nextCursor = nextItem?.id;
			}

			return {
				items,
				nextCursor,
			};
		}),

	// Obter resumo financeiro
	getResumo: protectedProcedure
		.input(
			z.object({
				startDate: z.date().optional(),
				endDate: z.date().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const where: Prisma.TransacaoWhereInput = { userId };

			if (input.startDate || input.endDate) {
				where.data = {};
				if (input.startDate) where.data.gte = input.startDate;
				if (input.endDate) where.data.lte = input.endDate;
			}

			const transacoes = await ctx.db.transacao.findMany({
				where,
				include: {
					tipoEntrada: true,
					tipoSaida: true,
				},
			});

			const totalEntradas = transacoes
				.filter((t) => t.tipoEntradaId)
				.reduce((sum, t) => sum + t.valor, 0);

			const totalSaidas = transacoes
				.filter((t) => t.tipoSaidaId)
				.reduce((sum, t) => sum + t.valor, 0);

			const saldo = totalEntradas - totalSaidas;

			// Agrupar por tipo
			const entradasPorTipo = transacoes
				.filter((t) => t.tipoEntradaId)
				.reduce(
					(acc, t) => {
						const tipo = t.tipoEntrada?.name || "Sem tipo";
						acc[tipo] = (acc[tipo] || 0) + t.valor;
						return acc;
					},
					{} as Record<string, number>,
				);

			const saidasPorTipo = transacoes
				.filter((t) => t.tipoSaidaId)
				.reduce(
					(acc, t) => {
						const tipo = t.tipoSaida?.name || "Sem tipo";
						acc[tipo] = (acc[tipo] || 0) + t.valor;
						return acc;
					},
					{} as Record<string, number>,
				);

			return {
				totalEntradas,
				totalSaidas,
				saldo,
				entradasPorTipo,
				saidasPorTipo,
				totalTransacoes: transacoes.length,
			};
		}),
});
