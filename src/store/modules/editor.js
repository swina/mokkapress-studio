const editor = {
    state: {
        current: null,
        action: null,
        level: null,
        parent: null,
        autosave: null,
        preview: null
    },
    mutations: {
        current ( state , current ){
            state.current = current
        },
        action ( state , action ){
            state.action = action
        },
        level ( state , level ){
            state.level = level
        },
        parent ( state , parent ){
            state.parent = parent
        },
        autosave ( state , blocks ){
            state.autosave = blocks
        },
        preview ( state , preview ){
            state.preview = preview
        }
    },
    actions: {
        setCurrent ( { commit } , current ){
            commit ( 'current' , current )
        },
        setAction ( { commit } , action ){
            commit ( 'action' , action )
        },
        setLevel ( { commit } , level ){
            commit ( 'level' , level )
        },
        setParent ( { commit } , parent ){
            commit ( 'parent' , parent)
        },
        autoSave ( { commit } , blocks ){
            commit ( 'autosave' , blocks )
        },
        setPreview ( { commit } , preview ){
            commit ( 'preview' , preview )
        }
    }

}

export default editor