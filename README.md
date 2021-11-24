# StartUpProject
This is my first startup project on github with technologies: ASP.NET Core Web API in conjunction with Angular


Для запуска проекта:
1)Склонируйте репозиторий к себе на диск.

2) Должен быть установлен Angular (у меня стоит версия 13).
3) БД была выбрана PostgreSQL(если такой нет, то нужно установить), для работы приложения с БД необходимо будет выполнить команду в package manager console (от Nuget) : PM> update-database. Следует обратить внимание, что в поле Default project  должен быть выбран проект .DAL![image](https://user-images.githubusercontent.com/82929837/143284031-26fadf4b-65bd-4025-90dd-df5bee39035a.png)

4) BackEnd - находится в папке api, FrontEnd - web
5) Для запуска бэкенда нужно выбрать в качестве запускаемого проекта "CustomerManager.API" ![image](https://user-images.githubusercontent.com/82929837/143283656-d36bcd43-0bfd-424d-a67f-ea829baafc35.png)
6) Для работы фронта нужно выполнить npm install в корне фронта (PS C:\StartUpProject\StartUpProject\src\web>) и для запуска - ng serve
По умолчанию стоит порт 58007
![image](https://user-images.githubusercontent.com/82929837/143284459-14038052-d365-4bab-9aae-f93607af9a9b.png)

http://localhost:58007/api/requests
![image](https://user-images.githubusercontent.com/82929837/143284764-cd81fd30-cd65-469e-b883-92943d5eaeb5.png)

При двойном клике по строке переходит в новый маршрут с описанием выбранной заявки. Файлы можно загружать или скачивать с сервера (картинки .jpg,.jpeg,.png )
