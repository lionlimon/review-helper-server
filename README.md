# Сервер для review-helper расширения
Данный сервер нужен для общения расширения с Notion. 

## Команды

`npm run dev` - запуск dev сервера  
`npm run start` - запуск сервера  

## Разворот

1. Устанавливаем пакеты `npm i`
2. Копируем `.env_examle` в `.env` 
3. Заполняем 
   * `PROBLEMS_DATABASE_ID` - id базы в notion, где будут находиться ошибки
   * `SECRET_TOKEN` - секретный [токен от notion](https://developers.notion.com/docs/authorization)
4. Запускаем сервер `npm run start`
