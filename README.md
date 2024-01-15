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


## Hemo Life API
## Base URL
<ul>
<li><a href="#">http://127.0.0.1:3000</a></li>
</ul>

<html>
  <head>
    <title>Express</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
  </head>
  <body>
    <h1>Express</h1>
    <p>Welcome to Express</p>
  </body>
</html>

## Endpoints URL
### Registrasi New User
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/auth/register</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">POST</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Content-Type: application/json</span></li></ul>
   <li>Body</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
         "alamat": "Long ",
         "email": "awan@gmail.com",
         "password": "123456",
         "id_gol_darah": "0VwOr",
         "jenis_kelamin": "Laki-laki",
         "nama": "Babanb",
         "no_hp": "083456070",
         "tanggal_lahir": "2022-01-09"
      }


<ul>
   <li>Response</li>
   <ul><li>JSON</li></ul>
</ul>

      {
        "message": "Data tersimpan",
        "user": {
          "sts_volunteer": 0,
          "alamat": "Jln Bondowoso Jakarta Selatan",
          "email": "example@gmail.com",
          "password": "$2b$10$WlxY0.o0zNk2qb0Z/K9hd.8TtG0IC82NMT43RD.6od.YsLd9inbUu",
          "id_gol_darah": "0VwOr",
          "jenis_kelamin": "Laki-laki",
          "nama": "Fantashis",
          "no_hp": "083456070",
          "tanggal_lahir": "2022-01-09",
          "id_user": "99aqkq7IqMRiFj26kgqzY"
        }
      }

### User Login
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/auth/login</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">POST</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Content-Type: application/json</span></li></ul>
   <li>Body</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
         "email": "example@gmail.com",
         "password": "123456"
      }
<ul>
   <li>Response</li>
   <ul><li>JSON</li></ul>
</ul>

      {
         "message": "User login successfuly",
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxMTEzMSwiZXhwIjoxNzA1MzE0NzMxfQ.IZsFUbHaBNqSwWrMNtQublHJFQULl3bHcFQzoFGGFps",
         "userId": "99aqkq7IqMRiFj26kgqzY",
         "id_gol_darah": "0VwOr"
      }

### Welcome Dashboard User
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/dashboardUser</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Content-Type: application/json</span></li></ul>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
        "success": true,
        "massage": "succes",
        "sukarelawan_menerima": [],
        "sukarelawan_menolak": [],
        "pemohon": [],
        "pendonor": [
          {
            "id_donor": 1,
            "gol_darah": "B+",
            "lokasi_pmi": "PMI Jakarta Utara",
            "email": "pmi.jakarta.utara@gmail.com",
            "tanggal_donor": null
          },
        ]
      }

### Welcome User Jadwal Donor PMI
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/jadwal/list</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Content-Type: application/json</span></li></ul>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>
