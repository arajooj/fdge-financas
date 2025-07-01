"use client";

import { ModeToggle } from "@/components/themes/ThemeSwitch";
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
		<header className="sticky top-0 z-50 w-full border-border/50 border-b bg-card/80 shadow-sm backdrop-blur-sm">
			<div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
				<Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
					<TabsList className="gap-2 bg-muted/50">
						<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
						<TabsTrigger value="adicionar">Adicionar Transação</TabsTrigger>
						<TabsTrigger value="config">Configurações</TabsTrigger>
					</TabsList>
				</Tabs>
				<div className="flex items-center gap-3">
					<ModeToggle />
					<Button
						variant="outline"
						onClick={() => signOut({ callbackUrl: "/" })}
						className="hover:bg-destructive hover:text-destructive-foreground"
					>
						Sair
					</Button>
				</div>
			</div>
		</header>
	);
}
