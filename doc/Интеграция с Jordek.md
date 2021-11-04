# Интеграция с Jordek

Jordek является отдельным проектом и располагается в двух репозиториях:
- `\\sf-tomsk\git\Jordek.git` (бэкенд)
- `\\sf-tomsk\git\jordek-ui.git` (фронтенд)

Репозитории Jordek подключаются к репозиторию "Управление перевозками" в виде [подмодулей](https://git-scm.com/book/ru/v2/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-Git-%D0%9F%D0%BE%D0%B4%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B8):
- `<you-projects-dir>\transport\src\api\lib\Jordek\`
- `<you-projects-dir>\transport\src\web\lib\jordek-ui\`

Документация для Jordek: 
`<you-projects-dir>\transport\src\api\lib\Jordek\Docs\`