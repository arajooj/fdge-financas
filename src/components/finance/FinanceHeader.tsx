"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function FinanceHeader({
	onTabChange,
	activeTab,
}: {
	onTabChange: (tab: string) => void;
	activeTab: string;
}) {
	return (
		<header className="sticky top-0 z-50 w-full bg-white shadow-sm">
			<div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
				<Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
					<TabsList className="gap-2">
						<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
						<TabsTrigger value="adicionar">Adicionar Transação</TabsTrigger>
						<TabsTrigger value="config">Configurações</TabsTrigger>
					</TabsList>
				</Tabs>
				<Button
					variant="outline"
					className="ml-4"
					onClick={() => signOut({ callbackUrl: "/" })}
				>
					Sair
				</Button>
			</div>
		</header>
	);
}
