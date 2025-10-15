document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("product");
  const input = document.getElementById("quantity");
  const button = document.getElementById("calculate");
  const result = document.getElementById("result");

  button.addEventListener("click", () => {
    const price = Number(select.value);
    const quantity = input.value.trim();

    // Проверка на корректность числа
    const isValid = /^[1-9][0-9]*$/.test(quantity);

    if (!isValid) {
      result.textContent = "❌ Ошибка: введите корректное количество (целое число > 0)";
      result.style.color = "red";
      return;
    }

    const total = price * Number(quantity);
    result.textContent = `💰 Стоимость заказа: ${total} ₽`;
    result.style.color = "green";
  });
});
