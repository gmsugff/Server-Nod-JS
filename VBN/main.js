const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Собираем данные
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;

  // Формируем объект для отправки
  const formData = {
    name,
    phone,
    email,
    comment
  };

  try {
    // Отправляем POST-запрос
    const response = await fetch('http://localhost:3000/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Проверяем, успешен ли ответ
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    // Парсим ответ (если сервер что-то вернул)
    const result = await response.json();
    console.log('Успешно отправлено:', result);

    // Оповещаем пользователя
    alert('Спасибо! Ваша заявка отправлена.');
    form.reset(); // очищаем форму

  } catch (error) {
    console.error('Ошибка при отправке:', error);
    alert('Произошла ошибка. Попробуйте позже.');
  }
});