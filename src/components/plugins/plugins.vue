<template>
    <div class="p-2 flex flex-col">
        <div class="grid grid-cols-3 grid-flow-row items-center" style="grid-template-columns:1fr 2fr 1fr;">
            <h3>Available Plugins</h3>
            <button @click="addPlugin">Add plugin</button> 
        </div>
        <div class="grid grid-cols-4 gap-4" v-if="plugins">
            <template v-for="plugin in plugins">
            <div class="p-4 relative shadow border rounded justify-center items-center flex flex-col">
                <i v-if="!plugin.enabled" class="material-icons text-5xl bg-gray-300 p-2 rounded-full">settings_input_component</i>
                <i v-if="plugin.enabled" class="material-icons text-5xl bg-lime-500 p-2 rounded-full">settings_input_component</i>
                <h4>{{ plugin.name }}</h4>
                <div class="text-sm text-center">{{ plugin.description }}</div>
                <button :class="plugin.enabled?'danger':'success'">{{ plugin.enabled ? 'Disable' : 'Enable' }}</button>
                <i class="absolute top-0 right-0 m-1 material-icons my-2" @click="current=plugin,pluginSettings=!pluginSettings">build</i>
            </div>
            </template>
        </div>
        <moka-modal
            size="lg"
            v-if="pluginSettings"
            @close="pluginSettings=!pluginSettings"
            @click_0="pluginSettings=!pluginSettings"
            @click_1="savePlugin()">
            <div slot="title">{{ current.name }} settings</div>
            <div slot="content" class="grid grid-cols-2 gap-5">
                <template v-for="(field,index) in Object.keys(current).sort()">
                    <div class="flex flex-col">
                    <label class="capitalize">{{field}}</label>
                    <div v-if="field==='id'">{{ current.id }}</div>
                    <input type="text" v-if="typeof current[field]==='string' && field!='id'" class="w-full" v-model="current[field]"/>
                    <input type="checkbox" v-if="typeof current[field]==='boolean'" v-model="current[field]">
                    <textarea class="w-full" v-if="field==='config'" v-model="configField"></textarea>
                    </div>
                </template>
                
            </div>
            <div slot="footer">
                <i>Please read the documentation before to enable/install a plugin</i>
            </div>
        </moka-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaPlugins',
    data:()=>({
        plugins: null,
        current: null,
        config: '',
        pluginSettings: false,
        pluginNew: false,
        configStr: {},
        configField: ''
    }),
    computed:{
        ...mapState ( ['moka'] )
    },
    watch:{
        pluginSettings(v){
            if ( v ){
                this.configField = JSON.stringify(this.current.config)
            }
        }
    },
    methods: {
        addPlugin(){
            let plugin = Object.assign ( {} , this.plugins[1] )
            
            Object.keys(plugin).map ( key => {
                if ( typeof plugin[key] === 'string' ) {
                    plugin[key] = ''
                } 
                if ( typeof plugin[key] === 'boolean' ) {
                    plugin[key] = false
                }
                if ( typeof plugin[key] === 'object' ) {
                    this.configStr[key] = ''
                }
                    
            }) 
            plugin.id = this.$randomID()
            this.current = plugin

            this.pluginSettings = true
            this.pluginNew = true
            
        },
        savePlugin(){
            /*let updates = this.plugins.map ( plugin => {
                if ( plugin.id === this.current.id ){
                    return this.current
                } else {
                    return plugin
                }
            })
            */
            this.current.config = JSON.parse(this.configField)
            if ( this.pluginNew ){
                this.plugins.push ( this.current )
                this.pluginNew = false
            }
            this.$http.put ( 'plugins' , { plugins: this.plugins } ).then ( res => {
                this.$message ( 'Plugins updated!' )
                this.pluginSettings = false
            })
            return 
        }
    },
    mounted(){
        this.$http.get ( 'plugins' ).then ( response => {
            console.log ( response.data.plugins )
            this.plugins = response.data.plugins
        })
    }
}
</script>