"use client";

import { useState } from "react";
import { ConfiguracoesManager } from "./ConfiguracoesManager";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceManager } from "./FinanceManager";
import { TransactionForm } from "./TransactionForm";

export default function ClientTabsLayout() {
	const [tab, setTab] = useState("dashboard");

	return (
		<div className="min-h-screen bg-background">
			<FinanceHeader onTabChange={setTab} activeTab={tab} />
			<div className="mx-auto max-w-4xl px-4 py-8">
				{tab === "dashboard" && <FinanceManager />}
				{tab === "adicionar" && <TransactionForm />}
				{tab === "config" && <ConfiguracoesManager />}
			</div>
		</div>
	);
}
