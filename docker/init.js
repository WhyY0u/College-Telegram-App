db = db.getSiblingDB('${DB_NAME}'); 

db.users.insertMany([
    {
        "login": "Admin",
        "email": "Admin@gmail.com",
        "name": "Admin",
        "surname": "Admin",
        "patronymic": "Admin",
        "password": "12345678"
    },
    {
        "login": "User",
        "email": "User@gmail.com",
        "name": "User",
        "surname": "User",
        "patronymic": "User",
        "password": "12345678"
    }
]);
