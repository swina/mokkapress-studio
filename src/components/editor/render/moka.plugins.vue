<template>
    <div class="grid grid-cols-5 gap-3" v-if="plugins">
        <template v-for="plugin in plugins">
             <div class="p-2 relative shadow border rounded justify-end items-center flex flex-col" @click="$emit('plugin',plugin)" v-if="plugin.enabled && !plugin.global">
                <i v-if="!plugin.enabled" class="material-icons text-xl bg-gray-300 p-2 rounded-full">settings_input_component</i>
                <i v-if="plugin.enabled" class="material-icons text-xl bg-lime-500 p-2 rounded-full">settings_input_component</i>
                <div>{{ plugin.name }}</div>
                <div class="text-xs text-center">{{ plugin.description.substring(0,20) }}</div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaEditorPlugins',
    data:()=>({
        plugins: null
    }),
    computed:{
        ...mapState ( ['moka'] )
    },
    mounted(){
        this.$http.get ( 'plugins' ).then ( res => {
            this.plugins = res.data.plugins
        })
    }
    
}
</script>