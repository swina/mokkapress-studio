<template>
    <moka-modal buttons="close" v-if="component" @close="$action(),name=null" @click_0="$action(),name=null">
        <div slot="title">{{ title }}</div>
        <div slot="content">
            <component :is="component" :component="component"/>
        </div>
    </moka-modal>
</template>

<script>
/**
 * * Actions controller
 * Loads relative component dynamically in a modal window components 
 * defined in ./plugins/components.js
 * !props
 *  @action
 */
import __components from '@/plugins/components'
export default {
    name: 'MokaEditorActions',
    props: ['action'],
    data:()=>({
        name: '',
        title: 'settings'
    }),
    computed:{
        component(){
            if ( this.name ){
                return () =>  import( '@/components/editor/render/' + this.name )
            }
        }
    },
    mounted(){
        let name
        if ( !__components.actions.hasOwnProperty(this.action) ) return
        if ( !__components.actions[this.action] ) return
        this.name = __components.actions[this.action].component 
        this.title = __components.actions[this.action].title || 'Settings'
    }

}
</script>