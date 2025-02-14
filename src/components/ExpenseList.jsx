/* eslint-disable react/prop-types */
import axios from "axios";

import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f4f4f4;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

export default function ExpenseList({ expenses , fetchExpenses }) {
    const handleDelete = async (id) => {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses();
    };

  return (
    <Container>
      <h2>Minhas Despesas</h2>
      {expenses.map((exp) => (
        <ExpenseItem key={exp._id}>
          <span>{exp.name} - R$ {exp.amount}</span>
          <span>{exp.category}</span>
          <Button onClick={() => handleDelete(exp._id)}>Remover</Button>
        </ExpenseItem>
      ))}
    </Container>
  );
}
