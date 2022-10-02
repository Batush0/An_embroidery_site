
const express = require('express');
const app = express();
const port = '8180';

const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static('public'));
require('dotenv').config()

const {xssCheck} = require('./xss-check.js')

app.get('/xss',(req,res)=>{
  res.send(xssCheck(req.body.data))
})



var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  
  con.connect(function(err) {
    if (err) {
        console.log('\n\n\n--------------probobly your database informations is sick .d check the .env file and fill the stuffs-----------------\n\n\n')
        throw err;
    }
  });

//work on it
app.post('/create',(req,res)=>{
    const data = req.body;
    const keys =  Object.keys(data);
    for(var i = 0;i<keys.length;i++){
      const key =data[keys[i]]; 
      if(key === undefined || key === null){
        res.status(400).send({message:'Gönderilen bilgilerde eksikler var ('+key+')'})
      }
    }
   
    con.query(`select name from yeng.product where name='${xssCheck(req.body.title)}' `,(error,result)=>{
      if(error) throw error;
      if(result.length === 0){
        con.query(`
        insert into yeng.product(image_id,name,dimension,size,hit,applique,color,detail_has,detail_content) 
        values('${xssCheck(req.body.img)}','${xssCheck(req.body.title)}',${xssCheck(req.body.dimension)},'${xssCheck(req.body.size)}','${xssCheck(req.body.hit)}',${xssCheck(req.body.applique)},'${xssCheck(req.body.color)}',${xssCheck(req.body.about.has)},'${xssCheck(req.body.about.detail)}')`,
    
        (error,result,fields)=>{
          if (error) {
            res.status(400).send({message:'hatan var brom'})
            throw error;
          }
          else{
            res.status(200).send({message:'işlem başarıla gerçekleşti'});
          }})
      }else{
        res.status(400).send({message:'bu isim daha önce kullanıldı'})
      }
    })
})


app.get('/product/edit/:title',(req,res)=>{
  con.query(`select * from yeng.product where name='${xssCheck(req.params.title)}'`,(error,result,fields)=>{
    if(error){
      res.status(400).send({message:'hatan var knk'});
      throw error;
    }
    if(!result[0]){
      res.status(500).send({message:'Kayıt bulunmamakta'})
    }
    else{
      res.status(200).send(result)
    }
  })
})

app.put('/product/edit',(req,res)=>{
  const data = req.body.data;
  const keys =  Object.keys(data);
  for(var i = 0;i<keys.length;i++){
    const key =data[keys[i]]; 
    if(key === undefined || key === null){
      res.status(400).send({message:'Gönderilen bilgilerde eksikler var ('+key+')'})
    }
  }
  con.query(`select name from yeng.product where name='${xssCheck(data.title)}' `,(error,result)=>{

    if(error) throw error;

    if(result.length === 0 ||(result.length === 1 && result[0].name == req.body.title)){
      con.query(`update yeng.product  set name = '${xssCheck(data.title)}' ,image_id = '${xssCheck(data.img)}', size = '${xssCheck(data.size)}',dimension=${xssCheck(data.dimension)},hit='${xssCheck(data.hit)}',applique=${xssCheck(data.applique)},color='${xssCheck(data.color)}',detail_has=${xssCheck(data.about.has)},detail_content='${xssCheck(data.about.detail)}' where id = ${xssCheck(data.id)}`,(error,result,fields)=>{
        if(error){
          throw error;
        }
        res.status(200).send({message:'işlem başarılı'})
      })
    }
    else{
      res.status(400).send({message:'bu isim daha önce kullanıldı'})
    }
  })
})
 
app.get('/product/get/:id',(req,res)=>{
  const query = `select detail_content , detail_has,color from yeng.product where id = ${xssCheck(req.params.id)} `;
  con.query(query,(error,result)=>{
    if(error) throw error;
    
    res.status(200).send({
      color:xssCheck(result[0].color)
      ,about:{
        has:xssCheck(result[0].detail_has)
        ,detail:xssCheck(result[0].detail_content)
      }})
  })
})
 
app.get('/product/requestCard/:lastIndex',async(req,res)=>{
   var lastIndex = req.params.lastIndex 

    if(isNaN(lastIndex)){
      con.query('select min(id) from yeng.product',(error,result)=>{
        if(error) throw error

        lastIndex = Object.values(result[0])[0]
      })
    }
    else{
      lastIndex++
    }

    

    con.query('select max(id) from yeng.product',(error,result)=>{
      if(error) throw error

      const maxIndex = Object.values(result[0])[0]
      const bound = parseInt(lastIndex) + 25

      con.query(`select id, image_id,name,dimension,size,applique,hit from yeng.product where id BETWEEN ${xssCheck(lastIndex)} and ${bound}`,(error,result)=>{
        if(error) throw error;

        res.status(bound >= maxIndex ? 500:200).send(result)
      
      })
    })
})

app.delete('/product/:id',(req,res)=>{ // changed
  con.query(`delete from yeng.product where id = ${xssCheck(req.params.id)}`,(error,result)=>{
    if(error) throw error
  })
  res.status(200).send()
})


app.get('/contact',(req,res)=>{
  con.query(`select *from yeng.contact`,(error,result)=>{
    if(error) throw error
    if(result[0]){
      res.status(200).send(result)
    }else{
      res.status(500).send({message:'yeni iletişim oluştur'})
    }
  })
})

app.post('/contact',(req,res)=>{
  const data = req.body
  con.query(`insert into yeng.contact(image_id,header,content,link) values('${xssCheck(data.image_id)}','${xssCheck(data.header)}','${xssCheck(data.content)}','${xssCheck(data.link)}')`,(err,result)=>{
    if(err) throw err
    res.status(200).send({message:`${xssCheck(xssCheck(data.header))} başarıyla oluşturuldu`})
  })
})

app.delete('/contact',(req,res)=>{
  con.query(`delete from yeng.contact where id = ${xssCheck(req.body.id)};`,(err,result)=>{
    if(err) throw err
    res.status(200).send({message:'kayıt başarıyla silindi'})
  })
})

app.get('/contact/last',(req,res)=>{
  console.log('pushed')
  con.query('SELECT * FROM yeng.contact WHERE id=(SELECT MAX(id) FROM yeng.contact)',(err,result)=>{
    if(err) throw err
    res.status(200).send(result)
  })
})
app.patch('/contact',(req,res)=>{
  const data = req.body
  if(data.data && data.block && data.id){
    con.query(`update yeng.contact set ${xssCheck(data.block)} = '${xssCheck(data.data)}' where id = ${xssCheck(data.id)}`,(err,result)=>{
      if(err) throw err
      res.status(200).send({dada:'dadada'})
    })
  }
  else res.status(400).send({message:'bir değer girmelisin'})
})

//npm run serve ..........



app.listen(port,()=>console.log(`${port} on fire maaan`));