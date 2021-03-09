
const Datastore = require( 'nedb' )
const tables = ['articles','blocks','elements','settings','uploads','projects']
const fs = require ( 'fs' )
const axios = require ( 'axios' )
var dbs = {}
var new_dbs = {}
const path = require ( 'path' )
const dataset = require( path.join(__dirname,'../../assets/data.definition.json') )
dataset.forEach ( collection => {
    if ( collection.uid.indexOf ( 'strapi' ) < 0 ){
        dbs[collection.schema.collectionName.toLowerCase()] = {
            db: new Datastore ({
                autoload: true,
                timestampData: true,
                filename: path.join ( __dirname , '../../../data/collections/' + collection.schema.collectionName.toLowerCase() + '.db' )
            })
        }
        doImport(collection)
        
    }
})

setMedia()

function setMedia(){
    dbs['uploads'] = {
        db: new Datastore ({
            autoload: true,
            timestampData: true,
            filename: path.join ( __dirname , '../../../data/collections/uploads.db' )
        })
    }
    axios.get ( 'http://192.168.1.150:1337/upload/files').then ( resp => {
        resp.data.forEach ( row => {
            dbs.uploads.db.insert ( row )
        })
    })
}
/*
tables.forEach ( table => {
  dbs[table] = {
     
    db: new Datastore ({
        autoload: true,
        timestampData: true,
        filename: path.join ( __dirname , '../../../data/' + table + '.db' )
      })
  }
})
*/
function doImport ( collection ){
        axios.get ( 'http://192.168.1.150:1337/' + collection.schema.collectionName.toLowerCase() ).then ( resp => {
            console.log ( resp.data )
            if ( typeof resp.data != 'object' ){
                resp.data.forEach ( row => {
                    console.log ( 'insert record => ' , row )
                    try {
                        dbs[collection.schema.collectionName.toLowerCase()].db.insert ( row , (err,res) =>{
                            console.log ( res )
                        } )
                    } catch ( e ){
                        console.log ( e , row , ' error!!!')
                    }
                })
            } else {
                dbs[collection.schema.collectionName.toLowerCase()].db.insert ( resp.data , (err,res) =>{
                    console.log ( res )
                } )
            }
        }).catch ( err => {
            console.log ( err )
            console.log ( collection.schema.collectionName , ' not imported!!!' )
        })
}
module.exports = dbs