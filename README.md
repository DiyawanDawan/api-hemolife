# api-hemolife

Kode Default Kolabuarsi bersama Tim Capstone Project

https://github.com/qolbiadi14/api-hemolife.git


Cara melakukan migrasi DB
1. buat file .env di root project dan buat juga nama databsenya di mysql

2. Pastikan username, password, host, name di .env sudah sesuai dengan databse masing 

Contoh

    DB_USERNAME = root
    DB_PASSWORD =
    DB_HOSTNAME = 127.0.0.1
    DB_NAME = db_donordarah
    DB_DIALECT = mysql

    JWT_SECRET=kunci_rahasia_anda


3. Perintah Untuk Migrasi database

    npx sequelize db:migrate

4. Untuk melakukan seender atau insert query di databse

    npx sequelize db:seed --seed 20231212101616-engine-insert-data.js

4. Cara melakukan seed pada tabel keseluruhanya perintah ini di jalankan ketika perintah sebelumnya belum di jalankan

    npx sequelize db:seed:all
