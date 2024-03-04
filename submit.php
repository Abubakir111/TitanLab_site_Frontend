<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $telegram = $_POST['telegram'] ?? '';

    // Составляем строку для записи в файл
    $data = "Имя: $name\nНомер телефона: $phone\nТелеграм: $telegram\n\n";

    $file = 'D:\VSCODE SITE\заявка.txt';

// Открываем файл для записи. Флаг 'a' означает, что будем добавлять данные в конец файла
$fp = fopen($file, 'a');

// Записываем данные в файл
fwrite($fp, $data);

// Закрываем файл
fclose($fp);
}
?>