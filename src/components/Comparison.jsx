/* eslint-disable react/prop-types */
export default function Comparison({ expenses }) {
    const now = new Date();
    const currentMonth = now.getUTCMonth(); // Pegamos o mês UTC
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    // Função para calcular o total gasto em um mês específico
    const sumExpenses = (month) =>
        expenses
          .filter((expense) => {
            const expenseDate = new Date(expense.createdAt);
            return expenseDate.getUTCMonth() === month; // Comparação em UTC
          })
          .reduce((acc, expense) => acc + expense.amount, 0);
    
      const currentTotal = sumExpenses(currentMonth);
      const lastTotal = sumExpenses(lastMonth);
    
    const difference = currentTotal - lastTotal;
    const message =
        difference > 0
            ? `Você gastou R$ ${difference.toFixed(2)} a mais que no mês anterior.`
            : `Você economizou R$ ${Math.abs(difference).toFixed(2)} em relação ao mês passado.`;

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Comparação de Gastos</h2>
            <p>Gastos mês atual: R$ {currentTotal.toFixed(2)}</p>
            <p>Gastos mês passado: R$ {lastTotal.toFixed(2)}</p>
            <strong>{message}</strong>
        </div>
    );
}
