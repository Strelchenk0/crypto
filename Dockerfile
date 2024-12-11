# Створення образу для збірки React/Vite
FROM node:18 AS build

# Встановлюємо робочий каталог
WORKDIR /app

# Копіюємо package.json і встановлюємо залежності
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Копіюємо код проекту
COPY . ./

# Збираємо додаток
RUN npm run build

# Встановлюємо образ Nginx для обслуговування статичних файлів
FROM nginx:alpine

# Копіюємо статичні файли з першого етапу (build)
COPY --from=build /app/dist /usr/share/nginx/html

# Відкриваємо порт 80 для Nginx
EXPOSE 80

# Стартуємо Nginx
CMD ["nginx", "-g", "daemon off;"]
