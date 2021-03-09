import Vue from 'vue'


export default {
    install: function (Vue) {
        Vue.prototype.$create = ( (db , data) => {
            if ( !data ) return
            console.log ( db , data )
            let qry = {
                table: db,
                qry: data
            }
            window.ipc.send ( 'insert' ,  qry )
        })

        Vue.prototype.$find = ( ( db , data = null ) => {
            if ( !db ) return
            let query
            if ( !data ){
                query = {
                    table: db,
                    qry: {},
                    fields: {}
                }
            } else {
                data['table'] = db
                query = data
            }
            window.ipc.send ( 'find' , query )
            
        })

        Vue.prototype.$upload = ( ( fileObject , name , file) => {
            console.log ( fileObject )
            window.ipc.send ( 'UPLOAD_FILE' , { file : { name: fileObject.name , size: fileObject.size , type: fileObject.type , dimensions: fileObject.dimensions } , name: name , content : file } )
        })
    }
}