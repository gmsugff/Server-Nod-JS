const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // разрешаем кросс-доменные запросы
app.use(bodyParser.json()); // парсим JSON
app.use(bodyParser.urlencoded({ extended: true })); // парсим form-data

// Обработка POST-запросов на /application
app.post('/application', (req, res) => {
    const data = req.body;
    console.log('Получена заявка:', data);
    
    // Сохраняем в файл
    const logLine = JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
    }) + '\n';
    
    fs.appendFile('applications.log', logLine, (err) => {
        if (err) console.error('Ошибка записи:', err);
    });
    
    // Отправляем ответ
    res.status(201).json({
        success: true,
        message: 'Заявка успешно отправлена',
        data: data
    });
});

// Проверка работы сервера
app.get('/', (req, res) => {
    res.send('Сервер работает! Отправляйте POST на /application');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});