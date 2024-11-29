import React, { createContext, useReducer, useContext } from 'react';
import { Expense } from '../types/types';

type Action = 
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'REMOVE_EXPENSE'; payload: string };

interface State {
  expenses: Expense[];
}

const initialState: State = {
  expenses: [],
};

export const ExpenseContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const expenseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'REMOVE_EXPENSE':
      return { ...state, expenses: state.expenses.filter(exp => exp.id !== action.payload) };
    default:
      return state;
  }
};

export const ExpenseProvider: React.FC = ({ children } : any) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
