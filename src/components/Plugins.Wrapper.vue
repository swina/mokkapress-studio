<template>
    <div :class="">
        <component :is="loadcomponent" :plugin="$attrs.plugin" :block="$attrs.block" :el="$attrs.plugin"/>
    </div>
</template>

<script>
export default {
    computed:{
         loadcomponent(){
            let name = this.$attrs.name
            return () =>  import(/* webpackChunkName: 'nuxpresso_' */ '@/components/plugins/' + name )
        },
    }
}
</script>