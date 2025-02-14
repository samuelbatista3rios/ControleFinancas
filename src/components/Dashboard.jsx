/* eslint-disable react/prop-types */
import { PieChart, Pie, Tooltip } from "recharts";

export default function Dashboard({ expenses }) {
  const data = expenses.reduce((acc, expense) => {
    const existing = acc.find((e) => e.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Gastos por Categoria</h2>
      <PieChart width={300} height={300}>
        <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} fill="#007bff" label />
        <Tooltip />
      </PieChart>
    </div>
  );
}
