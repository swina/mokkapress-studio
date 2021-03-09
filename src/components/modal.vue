<template>
    <div :class="'bg-white z-2xtop max-h-screen max-w-screen shadow-lg  rounded text-sm ' + size + position">
        <i v-if="close" class="material-icons absolute top-0 right-0 m-2 text-gray-400" @click="$emit('close')">close</i>
        <div class="w-full bg-gray-800 text-white  rounded-tl  rounded-tr px-2 py-1"><slot name="title"></slot></div>
        <div class="p-4 text-sm">
            <slot name="content"></slot>
            <slot name="footer"></slot>
        </div>
        <div class="px-4 p-1">
            <slot name="confirm">{{ confirmMsg }}</slot>
        </div>
        <div v-if="buttons != 'none'" :class="'w-full p-4 bg-gray-200 items-center justify-center p-2 grid grid-cols-' + btns[buttons].length">
            <template v-for="(button,i) in btns[buttons]">
                <button :class="button.class + ' m-auto'" @click="action(i)">
                    {{ button.label }}
                </button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MokaModal',
    props: { 
        close : {
            type: Boolean,
            default: true
        },
        buttons: {
            type: String,
            default: 'standard'
        }
    },
    data:()=>({
        btns: {
            none :[],
            close: [
                { label: 'Close' , class: 'bg-gray-600 round' }
            ],
            standard : [
                { label: 'Close' , class: 'danger  round' },
                {label:'OK',class:'success  round'}
            ],
            saveonly: [
                { label: 'Save' , class: 'success round' }
            ],
            save : [
                 { label: 'Close' , class: 'bg-gray-600 round' },
                { label: 'Save' , class: 'success round' },
            ],
            delete : [
                { label: 'Close' , class: 'bg-gray-600 round' },
                { label: 'Delete' , class: 'danger round' },
            ]
        },
        confirmMsg: ''
    }),
    computed:{
        size(){
            return !this.$attrs.size ?
                        'w-full md:w-3/4 lg:w-1/2' :
                            this.$attrs.size === 'sm' ? 
                                'w-full md:w-1/4 lg:w-1/6' :
                                    this.$attrs.size === 'lg' ? 
                                        'w-full md:w-3/4 lg:w-2/3' : 
                                            this.$attrs.size === 'full' ? 
                                                'w-screen h-screen' :
                                                    'w.full md:w-1/3 lg:w-1/3'
        },
        position(){
            return !this.$attrs.position ?
                ' modal' :
                    ' modal-' + this.$attrs.position
        },
        confirm(){
            return this.$attrs.confirm ? true : false
        }
    },
    methods:{
        action ( index ){
            if ( !this.confirm ){
                this.$emit('click_' + index )
            } else {
                console.log ( this.confirmMsg.length )
                if ( !this.confirmMsg.length ){
                    this.confirmMsg = this.$attrs.confirm 
                } else {
                    this.$emit ( 'click_' + index ) 
                }
                        
            }
        }
    },
    mounted(){
        
    }
}
</script>