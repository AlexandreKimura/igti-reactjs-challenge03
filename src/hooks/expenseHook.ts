import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseApi";

export interface IExpense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IExpenseDetails {
  categoria: string;
  valor: number;
}

export function useExpenseType(date: string | null, info: "RESUMO" | "DETALHES") {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [expensesDetails, setExpensesDetails] = useState<IExpenseDetails[]>([]);

  useEffect(() => {
    (async function getExpensesFromDB() {
      try {
        if (date) {
          let expenses = await getExpenses(date)
          setExpenses(expenses);

          let expenseDetail: IExpenseDetails[] = [];
          if(info === "RESUMO") {
            expenses.map((ex, index) => {
              if (index === 0) {
                return expenseDetail.push({
                  categoria: ex.categoria,
                  valor: ex.valor,
                });
              } else {
                const matchCategory = expenseDetail.findIndex(
                  (eD) => eD.categoria === ex.categoria
                );
                if (matchCategory === -1) {
                  return expenseDetail.push({
                    categoria: ex.categoria,
                    valor: ex.valor,
                  });
                } else {
                  return (expenseDetail[matchCategory].valor += ex.valor);
                }
              }
            });
            setExpensesDetails(expenseDetail);
          }else {
            setExpensesDetails([])
          }
        }
      } catch (err) {}
    })();
  }, [date, info]);

  return { expenses, expensesDetails }
}