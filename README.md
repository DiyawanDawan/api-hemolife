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

# Endpoints URL
## User Endpoints
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
        "message": "success",
         "error": false,
         user": {
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
         "error" false,
         "message": "User Loin success",
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxMTEzMSwiZXhwIjoxNzA1MzE0NzMxfQ.IZsFUbHaBNqSwWrMNtQublHJFQULl3bHcFQzoFGGFps",
         "userId": "99aqkq7IqMRiFj26kgqzY",
         "id_gol_darah": "0VwOr"
      }

### Welcome Dashboard User
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/dashboardUser</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
        "success": true,
        "massage": "success",
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


### User Jadwal Donor PMI
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/jadwal/list</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
         "success": true,
         "message": "success",
         "results": [
               {
               "id_lok_pmi": "2dfTA",
               "nama_lok_pmi": "PMI Jawa Barat",
               "alamat_pmi": "Jawa Barat",
               "tanggal_donor": "Kamis, 22 Februari 2001",
               "jadwal_jam_mulai": "09:00:00",
               "jadwal_jam_selesai": "14:55:00",
               "latitude": "-6.870538423420674",
               "longitude": "107.62042308129263"
               },
            ]
      }

### User Daftar Donor Darah
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/jadwal/daftar</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">POST</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Content-Type: application/json</span></li></ul>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Body</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
         "id_user": "99aqkq7IqMRiFj26kgqzY",
         "id_lokasi_pmi": "5OUEF",
         "id_gol_darah": "0VwOr",
         "id_jadwal": "AOPJw"
      }

<ul>
   <li>Response</li>
   <ul><li>JSON</li></ul>
</ul>

      {
         "success": true,
         "message": "Donor registration successfuly",
         "schedule": {
            "id_pendonor": 9,
            "status_donor": 1,
            "gol_darah": "B+",
            "lokasi_pmi": "PMI Jakarta Utara",
            "tanggal_daftar": "Selasa, 16 Januari 2024",
            "tanggal_donor": "Selasa, 20 Maret 2001"
         }
      }

### Detail PMI Jadwal
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/jadwal/detail/:id</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
         "success": true,
         "message": "success",
            "result": {
            "id_lok_pmi": "2dfTA",
            "nama": "PMI Jawa Barat",
            "no_telpon": "08437395734",
            "alamat": "Jawa Barat",
            "latitude": "-6.870538423420674",
            "longitude": "107.62042308129263",
            "schedules": [
               {
               "id_jadwal": "0zVD_",
               "jadwal_jam_mulai": "09:00:00",
               "jadwal_jam_selesai": "14:55:00",
               "tanggal_donor": "Kamis, 22 Februari 2001"
               }
            ]
         }
      }

### Search Jadwal By PMI
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/jadwal/search?q=&lt;query&gt;</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
         "error": false,
            "message": "success",
            "results": [
               {
               "id_lokasi_pmi": "5OUEF",
               "nama": "PMI Jakarta Utara",
               "email": "pmi.jakarta.utara@gmail.com",
               "no_telpon": "08139573463",
               "alamat": "Jakarta Utara",
               "latitude": "-6.094416145072793",
               "longitude": "106.92043562421657",
               "logo": "logo_pmi_jakarta_utara.png",
               "schedules": [
                     {
                        "id_jadwal": "AOPJw",
                        "jadwal_jam_mulai": "09:00:00",
                        "jadwal_jam_selesai": "14:55:00",
                        "tanggal_donor": "Selasa, 20 Maret 2001"
                     },
                     {
                        "id_jadwal": "bM4sX",
                        "jadwal_jam_mulai": "08:00:00",
                        "jadwal_jam_selesai": "16:30:00",
                        "tanggal_donor": "Rabu, 25 April 2001"
                     }
                  ]
               }
         ]
      }

### User Profile
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/userProfile</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
        "error": false,
        "message": "success",
        "user": {
          "id_user": "99aqkq7IqMRiFj26kgqzY",
          "id_gol_darah": "R6Z9u",
          "nama": "Nama Pengguna Baru",
          "email": "newemail@example.com",
          "no_hp": "081234567891",
          "jenis_kelamin": "Perempuan",
          "tanggal_lahir": "1995-05-15",
          "alamat": "Alamat Pengguna Baru",
          "password": "$2b$10$WlxY0.o0zNk2qb0Z/K9hd.8TtG0IC82NMT43RD.6od.YsLd9inbUu",
          "sts_volunteer": 0
        }
      }
### Update User Profile
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/auth/register</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">PUT</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Content-Type: application/json</span></li></ul>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Body</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
         "nama": "Awan",
         "email": "awan@example.com",
         "alamat": "Jln Kerta Jati, Jakarta Selatan",
         "jenis_kelamin": "Laki-laki",
         "tanggal_lahir": "1995-05-15",
         "id_gol_darah": "R6Z9u",
         "no_hp": "081234567891",
         "sts_volunteer": 1
      }


<ul>
   <li>Response</li>
   <ul><li>JSON</li></ul>
</ul>

      {
         "error": false,
         "message": "success",
         "user": {
            "id_user": "99aqkq7IqMRiFj26kgqzY",
            "id_gol_darah": "R6Z9u",
            "nama": "Awan",
            "email": "awan@example.com",
            "no_hp": "081234567891",
            "jenis_kelamin": "Laki-laki",
            "tanggal_lahir": "1995-05-15",
            "alamat": "Jln Kerta Jati, Jakarta Selatan",
            "password": "$2b$10$WlxY0.o0zNk2qb0Z/K9hd.8TtG0IC82NMT43RD.6od.YsLd9inbUu",
            "sts_volunteer": 1
         }
      }

### List Volunteer
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/volunteer/list</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

      {
         "error": false,
         "massage": "success",
         "volunteers": [
            {
               "id_user": "99aqkq7IqMRiFj26kgqzY",
               "id_gol_darah": "R6Z9u",
               "nama": "Awan",
               "email": "awan@example.com",
               "no_hp": "081234567891",
               "jenis_kelamin": "Laki-laki",
               "tanggal_lahir": "1995-05-15",
               "alamat": "Jln Kerta Jati, Jakarta Selatan",
               "sts_volunteer": 1
            }
         ]
      }

### Seacrh Volunteer By 
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/user/volunteer/search?q=&lt;query&gt;</span></li>
   <ul><li>NOTE</li><p>Query Seach By Name || Alamat || Golongan Darah</p></ul>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWFxa3E3SXFNUmlGajI2a2dxelkiLCJpZF9nb2xfZGFyYWgiOiIwVndPciIsImlhdCI6MTcwNTMxNTMzNiwiZXhwIjoxNzA1MzE4OTM2fQ.EdGxRUjiPK8ju9of8wEypLlsX2GXsoqXYgkSs367IY0</span></li></ul>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>
      
      {
        "error": false,
        "message": "success",
        "volunteers": [
          {
            "id_user": "aboehHtSck19H3cfbbp9I",
            "id_gol_darah": "NSYnx",
            "nama": "Awan",
            "email": "awana@gmail.com",
            "no_hp": "083456079",
            "jenis_kelamin": "Laki-laki",
            "tanggal_lahir": "2022-01-09",
            "alamat": "Senorang, Desa Pengengat Lombok Tengah",
            "sts_volunteer": 1,
            "gol_darah": "AB-"
          },
          {
            "id_user": "E-wA0buq0J4OPWKnOzaAW",
            "id_gol_darah": "9Hhth",
            "nama": "Babanb",
            "email": "baba@gmail.com",
            "no_hp": "08346680",
            "jenis_kelamin": "Laki-laki",
            "tanggal_lahir": "2022-01-09",
            "alamat": "Senorang, Desa Pengengat Lombok Tengah",
            "sts_volunteer": 1,
            "gol_darah": "A-"
          }
        ]
      }


## Blogs Endpoints
### List Blogs
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/blogs/list</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

        {
          "error": false,
          "message": "success",
          "blogs": [
            {
              "id_blog": "ATn3f",
              "judul": "Pentingnya Donor Darah",
              "konten": "Donor darah adalah proses menyumbangkan darah untuk keperluan transfusi. Ini adalah tindakan mulia yang dapat menyelamatkan nyawa banyak orang.",
              "penulis": "John Doe",
              "tanggal_publikasi": "Senin, 15 Januari 2024",
              "createdAt": "Invalid date",
              "updatedAt": "Invalid date"
            },
            {
              "id_blog": "D1JaJ",
              "judul": "Mengenal Seni Lukis",
              "konten": "Seni lukis adalah bentuk ekspresi kreatif yang memungkinkan seniman menyampaikan ide dan perasaan mereka melalui media visual. Beberapa seni lukis terkenal termasuk lukisan abstrak, realisme, dan impresionisme.",
              "penulis": "Michael Artiste",
              "tanggal_publikasi": "Senin, 15 Januari 2024",
              "createdAt": "Invalid date",
              "updatedAt": "Invalid date"
            }
          ]
        }


### Blogs Details By Id
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/blogs/detail/:id</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

    {
      "error": false,
      "message": "success",
      "blog": {
        "id_blog": "ATn3f",
        "judul": "Pentingnya Donor Darah",
        "konten": "Donor darah adalah proses menyumbangkan darah untuk keperluan transfusi. Ini adalah tindakan mulia yang dapat menyelamatkan nyawa banyak orang.",
        "penulis": "John Doe",
        "tanggal_publikasi": "Senin, 15 Januari 2024",
        "createdAt": "Invalid date",
        "updatedAt": "Invalid date"
      }
    }


### Seacrh Blog 
<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/blogs/search?q=&lt;query&gt;</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">GET</span></li>
   <li>Headers</li>
   <li>Response</li>
   <ul><li>JSON:</li></ul>
</ul>

    {
      "error": false,
      "message": "success",
      "blogs": [
        {
          "id_blog": "ATn3f",
          "judul": "Pentingnya Donor Darah",
          "konten": "Donor darah adalah proses menyumbangkan darah untuk keperluan transfusi. Ini adalah tindakan mulia yang dapat menyelamatkan nyawa banyak orang.",
          "penulis": "John Doe",
          "tanggal_publikasi": "Senin, 15 Januari 2024",
          "createdAt": "Invalid date",
          "updatedAt": "Invalid date"
        }
      ],
      "encodedQuery": "Donor%20Darah"
    }



## Admin Endpoints
### Login Admin

<ul>
   <li>URL <span style="color: #ef7878; background-color: #4c4c4b">/v1/auth/login</span></li>
   <li>Method  <span style="color: #ef7878; background-color: #4c4c4b">POST</span></li>
   <li>Headers</li>
   <ul><li><span style="color: #ef7878; background-color: #4c4c4b">Content-Type: application/json</span></li></ul>
   <li>Body</li>
   <ul><li>JSON:</li></ul>
</ul>

    {
      "email": "ariel@gmail.com",
      "password": "12345678"
    }

<ul>
   <li>Response</li>
   <ul><li>JSON</li></ul>
</ul>

    {
      "error": false,
      "message": "success",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoicjZ0cllHIiwiaWF0IjoxNzA1MzgzMzM4LCJleHAiOjE3MDUzODY5Mzh9.wIzi3KqhvQ2U4-QIH2edBGHk2u-cV-C8E02sLPkBehQ"
    }


