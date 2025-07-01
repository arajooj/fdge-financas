"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			className="h-9 w-9 transition-all duration-200 hover:scale-105 hover:shadow-md"
		>
			{theme === "light" ? (
				<Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-200" />
			) : (
				<Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-200" />
			)}
			<span className="sr-only">Alternar tema</span>
		</Button>
	);
}
