<template>
    <div class="grid grid-cols-2">
        <label>Records per page</label>
        <input type="number" min="1" v-model="editor.current.records"/>
        <div class="flex flex-col">
            <label>Currency</label>
            <small class="-mt-2 ml-1 text-gray-500">Apply if a Currency element is present</small>
        </div>
        <div>
            <input type="text" v-model="editor.current.currency"/>
        </div>

        <div class="flex flex-col">
            <label>Snipcart </label>
            <small class="-mt-2 ml-1 text-gray-500">Applied if Snipcart is enabled</small>
        </div>
        <input type="checkbox" v-model="editor.current.snipcart"/>

        <div class="grid grid-cols-2 col-span-2 rounded bg-gray-300 p-2 mb-2" v-if="editor.current.snipcart">
            <div class="flex flex-col">
                <label>Cart Icon </label>
                <small class="-mt-2 ml-1 text-gray-500"></small>
            </div>
            <input type="checkbox" v-model="editor.current.cart"/>
            
            <div class="flex flex-col">
                <label>Add To Cart button </label>
                <small class="-mt-2 ml-1 text-gray-500">You need to add an element with moka_add_to_cart class</small>
            </div>
            <input type="checkbox" v-model="editor.current.add_to_cart"/>
        </div>

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