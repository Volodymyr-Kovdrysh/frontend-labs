# Світлофор — ЛР5: асинхронні дані та GAS API

Ця версія продовжує застосунок ЛР4. React зберігає робочий стан у пам'яті, а Google Apps Script читає та оновлює один запис у Google Sheet. Автоматичний таймер не записує кожен крок на сервер: збереження виконується тільки кнопкою «Зберегти поточний сигнал».

## 1. Підготуйте Google Sheet

Створіть таблицю з аркушем `TRAFFIC_LIGHTS` і двома стовпцями:

| id | current_signal |
| --- | --- |
| main | red |

## 2. Розгорніть GAS Web App

1. Створіть проєкт Google Apps Script і вставте код із `gas/Code.gs`.
2. У налаштуваннях Script Properties задайте `DB_SPREADSHEET_ID` зі значенням ID таблиці.
3. Створіть версійне розгортання типу Web app. Надайте доступ браузерному клієнту без окремого OAuth-потоку відповідно до політики вашого облікового запису.
4. Скопіюйте URL розгортання, який закінчується на `/exec`.

GAS підтримує тільки `GET ?action=list` та `POST updateState`. POST приймає JSON як `text/plain;charset=utf-8`. Відповіді мають спільну форму `{ ok, data, error }`.

## 3. Налаштуйте React

У папці `traffic-lights` скопіюйте `.env.example` у `.env.local` і замініть значення на URL свого `/exec`:

```env
VITE_GAS_WEB_APP_URL=https://script.google.com/macros/s/ВАШ_DEPLOYMENT_ID/exec
```

Перезапустіть Vite після зміни env-файла. Не додавайте `.env.local` до Git.

## 4. Запустіть застосунок

```bash
npm install
npm run dev
```

Початковий GET відновлює сигнал `main`. Якщо запит не вдався, сторінка покаже помилку й кнопку «Повторити». Після зміни сигналу збереження запускається тільки явною кнопкою; статус запиту та помилка показуються в інтерфейсі. Після успішного запису перевірте значення у Sheet і перезавантажте сторінку.

## Межі цієї лабораторної

Таблиця та GAS Web App є навчальним сховищем без виробничої авторизації. Spreadsheet ID зберігається у Script Properties, а URL `/exec` — у локальному env-файлі React.

<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/1bf4a35d-75d1-4d21-a2a5-be7bccdf1de4" />
<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/0e373344-eb87-4f26-9f6d-e600e7c1a553" />
