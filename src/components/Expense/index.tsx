import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Typography,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";

import { Header } from "../Header";
import { useExpenseType } from "../../hooks/expenseHook";

const months = [
  { id: "01", month: "Janeiro" },
  { id: "02", month: "Fevereiro" },
  { id: "03", month: "Março" },
  { id: "04", month: "Abril" },
  { id: "05", month: "Maio" },
  { id: "06", month: "Junho" },
  { id: "07", month: "Julho" },
  { id: "08", month: "Agosto" },
  { id: "09", month: "Setembro" },
  { id: "10", month: "Outubro" },
  { id: "11", month: "Novembro" },
  { id: "12", month: "Dezembro" },
];

const years = ["2020", "2021"];

export default function Expense() {
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [info, setInfo] = useState<"RESUMO" | "DETALHES">("RESUMO");
  const { user } = useAuthContext();

  const { expenses, expensesDetails } = useExpenseType(date, info);
  const { dateInfo } = useParams();
  useEffect(() => {
    if (month && year) {
      setDate(`${year}-${month}`);
    } else if (dateInfo) {
      setDate(`${dateInfo.slice(0, 4)}-${dateInfo.slice(5)}`);
    }
  }, [year, month, dateInfo]);

  function handleDate(e: SelectChangeEvent<string>) {
    e.preventDefault();
    const dateInfo = e.target.value;
    if (years.indexOf(dateInfo) > -1) {
      setYear(dateInfo);
    } else {
      const monthId = months.find((m) => m.month === dateInfo);
      if (monthId) {
        setMonth(monthId.id);
      }
    }
  }

  function handleInfo() {
    if (info === "DETALHES") {
      setInfo("RESUMO");
    } else {
      setInfo("DETALHES");
    }
  }

  function totalExpenseValue(): string {
    let total = 0;
    expenses.map((ex) => {
      return (total += ex.valor);
    });
    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <Container>
      {user && <Header />}
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        marginTop="3rem"
      >
        <Box display="flex" width="15rem">
          <FormControl fullWidth>
            <InputLabel id="year">Ano</InputLabel>
            <Select
              labelId="year"
              onChange={(e: SelectChangeEvent<string>) => handleDate(e)}
              fullWidth
              defaultValue=""
            >
              {years.map((y, index) => (
                <MenuItem key={index} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="month">Mês</InputLabel>
            <Select
              id="month"
              onChange={(e: SelectChangeEvent<string>) => handleDate(e)}
              fullWidth
              defaultValue=""
            >
              {months.map((m) => (
                <MenuItem key={m.id} value={m.month}>
                  {m.month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography>
            Despesa total: <strong>{totalExpenseValue()}</strong>
          </Typography>
        </Box>
      </Box>
      {expenses.length > 0 && (
        <TableContainer>
          <Box
            display="flex"
            justifyContent="center"
            padding="10px 0 10px 0"
            gap="2rem"
          >
            <Button
              variant="text"
              style={
                info === "RESUMO"
                  ? {
                      color: "#000",
                      borderBottom: "3px solid red",
                      borderRadius: "0px",
                      padding: "0 20px 0 20px",
                    }
                  : {
                      color: "#000",
                      borderRadius: "0px",
                      padding: "0 20px 0 20px",
                    }
              }
              onClick={handleInfo}
            >
              RESUMO
            </Button>
            <Button
              variant="text"
              style={
                info === "DETALHES"
                  ? {
                      color: "#000",
                      borderBottom: "3px solid red",
                      borderRadius: "0px",
                      padding: "0 20px 0 20px",
                    }
                  : {
                      color: "#000",
                      borderRadius: "0px",
                      padding: "0 20px 0 20px",
                    }
              }
              onClick={handleInfo}
            >
              DETALHES
            </Button>
          </Box>
          {info === "DETALHES" ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Despesa</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Dia</TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((ex) => (
                  <TableRow key={ex.id}>
                    <TableCell>{ex.descricao}</TableCell>
                    <TableCell>{ex.categoria}</TableCell>
                    <TableCell>{ex.dia}</TableCell>
                    <TableCell>{ex.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Valor (R$)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expensesDetails.map((ex) => (
                  <TableRow key={ex.categoria}>
                    <TableCell>{ex.categoria}</TableCell>
                    <TableCell>
                      {ex.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
    </Container>
  );
}
