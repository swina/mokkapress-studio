<template>
    <slide :class="el.css.css" :el="el">
        <template v-for="item in el.items">
            <span class="my-3">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span> 
            </span>
            <div v-if="item.hasOwnProperty('submenu')" class="ml-8 my-1 flex flex-col">
                <template v-for="item in item.submenu">
                    <div class="my-2">
                    <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                    <span v-else><i :class="'bi-' + item.icon"></i></span>
                    </div>
                </template>
            </div>
        </template>
        
    </slide>
</template>

<script>
import  Slide  from '@/components/editor/preview/elements/menu/Menu/slide'
export default {
    name: 'MokaBurgerMenu',
    components: {
        Slide 
    },
    props: ['el']
}
</script>