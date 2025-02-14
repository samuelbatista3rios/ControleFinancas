/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
`;

const CATEGORIES = [
  "Alimentação",
  "Aluguel",
  "Transporte",
  "Lazer",
  "Saúde",
  "Educação",
  "Outros",
];

export default function AddExpense({ fetchExpenses }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/expenses", {
      name,
      amount: Number(amount),
      category,
    });
    setName("");
    setAmount("");
    setCategory(CATEGORIES[0]);
    fetchExpenses();
  };

  return (
    <Container>
      <h2>Adicionar Despesa</h2>
      <Input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
      <Button onClick={handleSubmit}>Adicionar</Button>
    </Container>
  );
}
