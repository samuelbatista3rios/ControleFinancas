import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import Dashboard from "../components/Dashboard";
import ThemeToggle from "../components/ThemeToggle";
import Comparison from "../components/Comparison";

import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const fetchExpenses = async () => {
    const { data } = await axios.get("http://localhost:5000/api/expenses");
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.createdAt);
    return expenseDate.getUTCMonth() === selectedMonth; // Agora compara UTC corretamente
  });

  return (
    <Container theme={theme}>
      <h1>Meus gastos</h1>
      <ThemeToggle />
        
      <h3>Selecione o Mês:</h3>
      <Select onChange={(e) => setSelectedMonth(Number(e.target.value))}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {new Date(2024, i).toLocaleString("pt-BR", { month: "long" })}
          </option>
        ))}
      </Select>
      <AddExpense fetchExpenses={fetchExpenses} />
      <ExpenseList expenses={filteredExpenses} fetchExpenses={fetchExpenses} />
      <Dashboard expenses={filteredExpenses} />
      <Comparison expenses={expenses} />
    </Container>
  );
}
