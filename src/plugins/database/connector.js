const Datastore = require( 'nedb' )
//import path from 'path'
const path = require ( 'path' )
const db = new Datastore ({
  autoload: true,
  filename: path.join ( __dirname , '../assets/data.db' )
})


module.exports = { db }