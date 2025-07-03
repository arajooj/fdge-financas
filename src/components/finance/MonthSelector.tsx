"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSelectorProps {
	currentDate: Date;
	onDateChange: (date: Date) => void;
}

export function MonthSelector({
	currentDate,
	onDateChange,
}: MonthSelectorProps) {
	const formatMonthYear = (date: Date) => {
		return new Intl.DateTimeFormat("pt-BR", {
			month: "long",
			year: "numeric",
		}).format(date);
	};

	const goToPreviousMonth = () => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() - 1);
		onDateChange(newDate);
	};

	const goToNextMonth = () => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() + 1);
		onDateChange(newDate);
	};

	const goToCurrentMonth = () => {
		onDateChange(new Date());
	};

	const isCurrentMonth = () => {
		const now = new Date();
		return (
			currentDate.getMonth() === now.getMonth() &&
			currentDate.getFullYear() === now.getFullYear()
		);
	};

	return (
		<Card className="border-border/50 shadow-lg">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">Período</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<Button
						variant="outline"
						size="sm"
						onClick={goToPreviousMonth}
						className="flex items-center gap-1"
					>
						<ChevronLeft className="h-4 w-4" />
						Anterior
					</Button>

					<div className="flex flex-col items-center">
						<h3 className="font-semibold text-lg capitalize">
							{formatMonthYear(currentDate)}
						</h3>
						{!isCurrentMonth() && (
							<Button
								variant="ghost"
								size="sm"
								onClick={goToCurrentMonth}
								className="text-muted-foreground text-xs hover:text-foreground"
							>
								Voltar ao mês atual
							</Button>
						)}
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={goToNextMonth}
						className="flex items-center gap-1"
					>
						Próximo
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
