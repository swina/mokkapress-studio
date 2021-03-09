<template>
    <div >
        <div class="col-span-2">
            <label>Editor preview</label>
            <input type="checkbox" v-model="editor.current.plugin.editor"/>
        </div>
        <div class="flex flex-row">
            <button @click="tab='general'">General</button>
            <button @click="tab='template'">Template</button>
        </div>
        <div v-if="tab==='general'" class="grid grid-cols-2 gap-5">
        <template v-for="(field,index) in Object.keys(editor.current.plugin.config).sort()">
            <div class="flex flex-col">
            <label class="capitalize">{{field}}</label>
            <div v-if="field==='id'">{{ editor.current.plugin.config.id }}</div>
            <input type="text" v-if="typeof editor.current.plugin.config[field]==='string' && field!='id'" class="w-full" v-model="editor.current.plugin.config[field]"/>
            <input type="checkbox" v-if="typeof editor.current.plugin.config[field]==='boolean'" v-model="editor.current.plugin.config[field]">
            <input type="number" v-if="typeof editor.current.plugin.config[field]==='number'" v-model="editor.current.plugin.config[field]">
            <!--<textarea class="w-full" v-if="field==='config'" v-model="configField"></textarea>-->
            </div>
        </template>
        </div>
        <div v-if="tab==='template'">
            <label>Template</label>
            <button @click="pasteClipboard"></button>
            <textarea v-model="clipboard"/>
            <small>Paste the block you copied from the editor</small>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaEditorPluginSettings',
    data: ()=>({
        tab: 'general',
        clipboard: null
    }),
    computed:{
        ...mapState ( ['editor'] )
    },
    methods:{
        pasteClipboard (){
            this.clipboard = window.localStorage.getItem('nuxpresso-clipboard')
            this.editor.current.plugin.config.template = JSON.parse(this.clipboard)
        }

    }
}
</script>