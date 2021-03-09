<template>
<div>

    <button @click="importFile=!importFile">Import</button>
    <button @click="exportFile=!exportFile">Export</button>
    <div class="flex flex-col text-sm p-4" v-if="schema && products">
        <div :class="'w-full bg-gray-400 grid grid-cols-' + Object.keys(schema).length">
        <template v-for="field in Object.keys(schema)">
            <div class="capitalize font-bold p-2">
                {{ field }}
            </div>
        </template>
        </div>
        <template v-for="product in products">
            <div :class="'w-full p-1 border-b border-l border-r grid grid-cols-' + Object.keys(schema).length" v-if="product.name">
                <template v-for="field in Object.keys(schema)">
                    <div v-if="product[field] && ( schema[field].type != 'text' || field.includes('image'))">
                        <span v-if="!field.includes('image')">{{ product[field] }}</span>
                        <img :src="product[field]" v-if="field.includes('image')" class="w-24"/>
                    </div>
                    <div v-else></div>
                    
                </template>
            </div>
        </template>

    </div>
    <moka-modal
        size="lg"
        v-if="importFile"
        @close="importFile=!importFile"
        @click_0="importFile=!importFile"
        @click_1="importData">
        <div slot="title">Import Products</div>
        <moka-products-import slot="content"/>
    </moka-modal>
    <moka-modal
        size="lg"
        v-if="exportFile"
        @close="exportFile=!exportFile"
        @click_0="exportFile=!exportFile"
        @click_1="exportData">
        <div slot="title">Export Products</div>
        <moka-products-export slot="content"/>
    </moka-modal>

</div>
</template>

<script>
import MokaProductsImport from './products.import'
import MokaProductsExport from './products.export'
export default {
    name: 'MokaProducts',
    data:()=>({
        importFile: false,
        exportFile: false,
        products: null,
        schema: null
    }),
    components:{
        MokaProductsImport , MokaProductsExport
    },
    methods: {
        importData(){
            return 
        },
        exportData(){
            return
        }
    },
    mounted(){
        this.$http.get ( 'products' ).then ( res => {
            this.products = res.data
        })
        this.$http.get ( 'content-type-builder/content-types' ).then ( res => {
            const uid = res.data.data.filter ( ct => {
                return ct.schema.name === 'Product'
            })
            return uid[0].uid
        }).then ( uid => {
            this.$http.get ( 'content-type-builder/content-types/' + uid ).then ( res => {
                this.schema = res.data.data.schema.attributes
            })
        })
    }
}
</script>