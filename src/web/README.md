# Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



Если проблема с цифровыми подписями для ng, то необходимо сделать следующее:
1) Открыть PowerShell от имени администратора
2) проверить политики get-executionpolicy -list
3) установить для LocalMashine:      set-executionpolicy remotesigned
4) установить политики для CurrentUser:    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser


DevExpress:
1)Сначала необходимо установить devextreme и devextreme-angular npm пакеты(https://js.devexpress.com/Documentation/Guide/Angular_Components/Getting_Started/Add_DevExtreme_to_an_Angular_CLI_Application/)
npm install devextreme@21.2 devextreme-angular@21.2 --save --save-exact
2)Настроить таблицы стилей. Открыть файл angular.json и указать ссылку на предопределенную таблицу стилей темы (dx.light.css в приведенном ниже коде).
{
  "projects": {
    "ProjectName": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/devextreme/dist/css/dx.light.css",
              "src/styles.css"
            ],
            ...
          },
          ...
        },
        ...
      }
    },
    ...
  },
  ...
}

3) 
Затем перейдите в папку src, откройте файл index.html и добавьте класс dx-viewport в тег body. 
Это гарантирует, что цвета темы и настройки типографики применяются ко всем элементам страницы (а не только к компонентам пользовательского интерфейса DevExtreme).
<html lang="en">
    <head>
        <!-- ... -->
    </head>
    <body class="dx-viewport">
        <app-root></app-root>
    </body>
</html>


Angular Material - для тулбаров и прочего:
1)Установка    ng add @angular/material
2)Настройка	
	The package @angular/material@13.0.1 will be installed and executed.  --- жмем Y

	Choose a prebuilt theme name, or "custom" for a custom theme: (Use arrow keys)      ---Deep Purple/Amber  [ Preview: https://material.angular.io?theme=deeppurple-amber ] 

	Set up global Angular Material typography styles? (y/N)    --- N

	Set up browser animations for Angular Material? (Y/n)    ---Y

Установка и настройка(https://dev.to/qarunqb/angular-material-handbook-setup-and-basics-3ie0)
Гайд (https://material.angular.io/components/categories)


UploadFiles:
1)  ng g c upload --spec false





















