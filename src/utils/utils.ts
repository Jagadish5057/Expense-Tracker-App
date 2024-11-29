import { Expense } from '../types/types';

export const getTotalSpending = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getCategoryBreakdown = (expenses: Expense[]) => {
  const breakdown: { [key: string]: number } = {};

  expenses.forEach((expense) => {
    breakdown[expense.category] = (breakdown[expense.category] || 0) + expense.amount;
  });

  return Object.keys(breakdown).map((key) => ({
    name: key,
    total: breakdown[key],
  }));
};
