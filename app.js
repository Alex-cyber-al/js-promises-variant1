// Практична робота 10.1
// Варіант 1: Система замовлення їжі
// Вимога: використовувати нативні Promise без async/await

const order = {
  id: "ORDER-101",
  amount: 450,
  items: ["Піца", "Салат", "Сік"]
};

// Допоміжна функція для випадкової помилки
function hasError() {
  return Math.random() < 0.2; // 20% шанс помилки
}

// 1. Перевірка наявності товарів
function checkAvailability(orderId) {
  return new Promise((resolve, reject) => {
    console.log(`[1] Перевірка наявності товарів для замовлення ${orderId}...`);

    setTimeout(() => {
      if (!orderId) {
        reject(new Error("Некоректний ID замовлення"));
        return;
      }

      if (hasError()) {
        reject(new Error("Помилка: деяких товарів немає в наявності"));
        return;
      }

      console.log(`[1] Товари для замовлення ${orderId} є в наявності`);
      resolve({
        orderId: orderId,
        amount: order.amount
      });
    }, 1000);
  });
}

// 2. Резервування товарів
function reserveItems(orderId) {
  return new Promise((resolve, reject) => {
    console.log(`[2] Резервування товарів для замовлення ${orderId}...`);

    setTimeout(() => {
      if (!orderId) {
        reject(new Error("Некоректний ID замовлення під час резервування"));
        return;
      }

      if (hasError()) {
        reject(new Error("Помилка: не вдалося зарезервувати товари"));
        return;
      }

      console.log(`[2] Товари для замовлення ${orderId} зарезервовано`);
      resolve({
        orderId: orderId,
        amount: order.amount
      });
    }, 1000);
  });
}

// 3. Обробка оплати
function processPayment(orderId, amount) {
  return new Promise((resolve, reject) => {
    console.log(`[3] Обробка оплати для замовлення ${orderId} на суму ${amount} грн...`);

    setTimeout(() => {
      if (!orderId || amount <= 0) {
        reject(new Error("Некоректні дані для оплати"));
        return;
      }

      if (hasError()) {
        reject(new Error("Помилка: оплату не вдалося провести"));
        return;
      }

      console.log(`[3] Оплату замовлення ${orderId} успішно проведено`);
      resolve({
        orderId: orderId,
        amount: amount,
        paymentStatus: "paid"
      });
    }, 1500);
  });
}

// 4. Планування доставки
function scheduleDelivery(orderId) {
  return new Promise((resolve, reject) => {
    console.log(`[4] Планування доставки для замовлення ${orderId}...`);

    setTimeout(() => {
      if (!orderId) {
        reject(new Error("Некоректний ID замовлення під час доставки"));
        return;
      }

      if (hasError()) {
        reject(new Error("Помилка: не вдалося запланувати доставку"));
        return;
      }

      console.log(`[4] Доставку для замовлення ${orderId} заплановано`);
      resolve({
        orderId: orderId,
        deliveryTime: "40 хвилин",
        status: "completed"
      });
    }, 1000);
  });
}

// Основний ланцюжок промісів
console.log("Початок обробки замовлення");
console.log("Дані замовлення:", order);

checkAvailability(order.id)
  .then((result) => {
    return reserveItems(result.orderId);
  })
  .then((result) => {
    return processPayment(result.orderId, result.amount);
  })
  .then((result) => {
    return scheduleDelivery(result.orderId);
  })
  .then((result) => {
    console.log("Замовлення успішно оброблено!");
    console.log(`Номер замовлення: ${result.orderId}`);
    console.log(`Статус: ${result.status}`);
    console.log(`Час доставки: ${result.deliveryTime}`);
  })
  .catch((error) => {
    // Централізована обробка помилок
    console.error("Обробку замовлення зупинено");
    console.error(error.message);
  })
  .finally(() => {
    // Фінальний блок для очищення
    console.log("Очищення тимчасових даних...");
    console.log("Роботу програми завершено");
  });
