export interface Expense {
    id: string;
    amount: number;
    category: string;
    date: string;
    note?: string;
  }
  
  export interface CategoryBreakdown {
    name: string;
    total: number;
  }
  