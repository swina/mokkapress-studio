
const Datastore = require( 'nedb' )
const tables = ['articles','blocks','elements','settings','uploads','projects']
var dbs = {}
const path = require ( 'path' )
tables.forEach ( table => {
  dbs[table] = {
     
    db: new Datastore ({
        autoload: true,
        timestampData: true,
        filename: path.join ( __dirname , '../../../data/' + table + '.db' )
      })
  }
})
module.exports = dbs