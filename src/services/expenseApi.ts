import { IExpense } from "../hooks/expenseHook";
import { httpRequest } from "./http";

async function getExpenses(mes: string): Promise<IExpense[]> {
  const expenses = await httpRequest(`/despesas?mes=${mes}&_sort=dia`)
  return expenses
}

export { getExpenses }