require('dotenv').config();
const mysql = require('mysql');

var conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  
  conn.connect(function(err) {
    if (err) {
        console.log('\n\n\n--------------probobly your database informations is sick .d check the .env file and fill the stuffs-----------------\n\n\n')
    }
});

conn.query('CREATE SCHEMA `yeng`',(e,r)=>{ //yeng
    if(e) throw e
    console.log('schema has been created')
}) 

conn.query('CREATE TABLE `yeng`.`product` (`id` INT AUTO_INCREMENT,image_id varchar(100),name	varchar(30),dimension tinyint,size	varchar(15),applique	tinyint,color varchar(200),detail_has tinyint,detail_content	varchar(16000),hit varchar(15),PRIMARY KEY (`id`))',(e,r)=>{
    if(e) throw e
    console.log('table product succesfuly has been  created')
})

conn.query('CREATE TABLE `yeng`.`contact` (`id` INT AUTO_INCREMENT,image_id varchar(200),header varchar(50),content varchar(3000),link varchar(60),PRIMARY KEY (`id`))',(e,r)=>{
    if(e) throw e
    console.log('table contact has been  created')
})
