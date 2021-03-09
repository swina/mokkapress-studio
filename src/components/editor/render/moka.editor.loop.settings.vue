<template>
    <div class="grid grid-cols-2">
        <label>Records per page</label>
        <input type="number" min="1" v-model="editor.current.records"/>
        <label>Currency</label>
        <input type="text" v-model="editor.current.currency"/> <small>Apply if a Currency element is present</small>
        <label>Pagination</label>
        <input type="checkbox" v-model="editor.current.pagination"/>
        <div v-if="editor.current.pagination" class="bg-gray-200 p-4 rouded-lg col-span-2">
            <moka-color attr="textcolor" @css="setColors"/>
            <label>Justify</label>
            <select v-model="editor.current.pagination_justify">
                <option value="text-center">center</option>
                <option value="text-left">left</option>
                <option value="text-right">right</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaEditorLoopSettings',

    computed:{
        ...mapState ( ['editor'] )
    },
    methods:{
        setColors(colors){
            this.editor.current.pagination_color = colors
        }
    }
}
</script>