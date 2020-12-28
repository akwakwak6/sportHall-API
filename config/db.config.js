
const configMySqlDB = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}

const pictureFolder = "pictures/"

// if roles tab is empty => creat roles
const configRoles = [
    { name:"admin", id:1 },
    { name:"modo", id:2 }
]

// if roles tab is empty => creat users with roleId 1
const configUsers = [
    { mail:"admin@com",	password:"admin", name:"admin" }
]


module.exports = { configMySqlDB,configRoles,configUsers,pictureFolder }