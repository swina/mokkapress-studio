const { table } = require('console');
const { app, contextBridge, ipcRenderer , ipcMain }  = require('electron');
const fs = require ( 'fs' )

/**
 * !create tables and autoload
 */
const dbs = require ( './database/tables')
/**
 * channels : each channel defines a service called by window.ipc.send ( channel , data )
 * if a channel is not set no action
 */
const validChannels = ['insert' , 'find' ,'READ_FILE', 'WRITE_FILE', 'UPLOAD_FILE'];


contextBridge.exposeInMainWorld(
  'ipc', {
    send: async (channel, data) => {
      
      if (validChannels.includes(channel)) {
        if ( channel === 'insert' ){
          console.log ( dbs[data.table].db )
          dbs[data.table].db.insert ( data.qry , function ( err , resp ){
            if ( err ) ipcRenderer.send ( channel , err )
            let response = {
              data: resp.data,
              table: data.table
            }
            ipcRenderer.send ( channel , response )
          })
          
        }
        if ( channel === 'find' ){
          let query = data.qry ? data.qry : {}
          let fields = data.fields ? data.fields : {}
          console.log ( query , fields , data.table )
          console.log ( dbs[data.table] )
          dbs[data.table].db.find ( query , fields , function(err,res){
            console.log ( res )
            let response = {
              data: res,
              table: data.table
            }
            ipcRenderer.send ( channel , response )
          })
          
        }
        if ( channel === 'UPLOAD_FILE' ){

          const content = fs.writeFileSync( path.join ( __dirname , '../../public/img/' + data.name ) , data.content , 'binary' );
          dbs.uploads.db.insert ( data.file , ( err, res ) => {
            if ( err ) ipcRenderer.send ( channel , err )
            ipcRenderer.send ( channel , res )
          })
        }
        
        
      }
    },
    
    on: (channel, func) => {
      if (validChannels.includes(channel)) {
        // Strip event as it includes `sender` and is a security risk
        ipcRenderer.once ( channel, (event, ...args ) => func( ...args ) );

      }
    },
  },
);
