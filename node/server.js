const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const DBjson = 'DB.json'

class App {
  constructor (){
    this.startServer()
    this.DATA = this.iniData()
  }

  iniData (){
    let data
    try{
      const content = fs.readFileSync( DBjson,'utf8', (error,content) => content ) || "[]"
      data = JSON.parse(content) || []
    }catch(err){
      console.log('Error',err)
    }
    return data
  }
  save ( product ){
    const DATA = [
      ...this.DATA,
      product
    ]
    try{
      const done = fs.writeFileSync( DBjson, JSON.stringify( DATA ), err => {
        if(err)
          console.log('Error: ', err)  
      } )

      this.DATA = DATA
    }catch(err){
      console.log('Error: ', err)
    }

    return true
  }

  getProducts (){
    return this.DATA
  }

  startServer (){
    const server = express()
    const router = express.Router()

    router.get('/getProducts', (req,res) => {
      const motor = req.app.get('motor')
      const products = motor.getProducts( res )
      
      console.log('req:products')
      res.send( products)
    })

    router.post('/save', (req,res) => {
      const motor = req.app.get('motor')
      const done = motor.save( req.body.product )

      console.log('req:save')
      res.send({ done })
    })

    server.set('motor', this)

    server.use( cors() )
    server.use(express.urlencoded({ extended: false }))
    server.use(express.json())
    server.use(bodyParser.json())
    server.use('/', router)
    server.use((req, res) => res.status(405).json(405))
    
    console.log( 'Running...' )

    server.listen(8080)
  }
}

const startApp = new App()
