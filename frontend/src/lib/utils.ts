import type { ClassValue } from "clsx";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { LP_TYPE } from "./landing-page/constants";
/**
 * Combines clsx and tailwind-merge utilities for optimal className handling
 * @param inputs - Class values to be processed
 * @returns A single, optimized className string
 *
 * @example
 * // Basic usage
 * cn('p-2', 'text-red-500'); // 'p-2 text-red-500'
 *
 * // With conditional classes
 * cn(
 *   'p-2',
 *   isActive ? 'bg-blue-500' : 'bg-gray-200',
 *   isDisabled && 'opacity-50 cursor-not-allowed'
 * );
 */

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Number formatter
export function formatNumber(num: number, slice?: number) {
    const [integerPart, decimalPart = ""] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedDecimal = (`${decimalPart}`).slice(0, slice || 6);
    return (
        formattedDecimal ? `${formattedInteger}.${formattedDecimal}` : `${formattedInteger}`
    );
}

// Number formatter
export function formatNumberFromString(num?: string) {
    if (!num)
        return "0";
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate monthly income amount
export function getMonthlyIncomeAmount(principalAmount: number, monthlyInterestRate: number) {
    return principalAmount * monthlyInterestRate;
}

// Calculate total interest amount
export function getTotalInterestAmount(monthlyIncomeAmount: number, durationMonths: number) {
    return monthlyIncomeAmount * durationMonths;
}

export function getLPType(tab: string) {
    return tab === "1" ? LP_TYPE.SAFE_FLP : tab === "2" ? LP_TYPE.RWA_FLP : tab === "3" ? LP_TYPE.PRELAUNCH_IMPACT_FLP : tab === "4" ? LP_TYPE.IMPACT_FLP : "";
}

export const calculateTotalCapital = (boostAmount: number) => {
    return 175000 + boostAmount;
};

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
        day: "numeric",
    });
}
