<template>
<div>
    <nav v-if="el.element === 'menu'" :class="menu_responsive(el) + ' z-top ' + el.css.align"> 
        
        
        <div menu_item v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative pr-4'" :key="el.id + '_' + i"> 

            <a :class="el.css.css" v-if="!item.submenu && !$attrs.develop && item.link && !item.link.includes('http')" :href="item.link">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span> 
            </a>
            
            <span v-else @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">
                <span v-if="!item.hasOwnProperty('icon') && !item.icon">{{ item.label }}</span>
                <span v-else><i :class="'bi-' + item.icon"></i></span>
            </span>
            
            <transition name="slidedown">
            <div submenu v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.submenu + ' absolute flex flex-col z-highest'" @mouseleave="menuover=-1"> 
                <template iv v-for="sub in item.submenu">
                    <div :class="el.css.css">{{sub.label}}</div>
                </template>
            </div>
            </transition>
        </div>
        

    </nav>
    <div class="md:hidden" id="page-wrap">
        <moka-burger-menu :el="el"/>
    </div>
    <!-- responsive -->
    <!--
    <i :class="'bi-list moka-icons z-max fixed md:hidden top-0 left-0 m-1 text-3xl' + el.css.css " v-if="el.element === 'menu' && el.responsive" @click="showmenu"></i>
    <transition :name="'fade' || responsive_transition_settings">
        <nav v-if="menu_show" :class="'md:hidden ' + responsive_css_settings"> 
            <i :class="'bi-list moka-icons z-max fixed md:hidden top-0 left-0 m-1 text-3xl ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="showmenu"></i>
            <div class="h-6"></div>
            <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative p-1'"> 
                
                <a :class="el.css.css + ' text-xl'" :href="item.link">{{ item.label }}</a>
                
                
                <div v-if="item.submenu && item.submenu.length" :class="el.css.css + ' ml-2 flex flex-col'"> 
                    <div v-for="sub in item.submenu">
                        <a :class="el.css.css" :href="sub.link">{{ sub.label }}</a>
                    </div>
                </div>
            </div>
        </nav>
    </transition>
    -->
</div>
</template>

<script>
import MokaBurgerMenu from './moka.burger.menu'
import { mapState } from 'vuex'

var gsap
export default {
    name: 'MokaMenuElement',
    components: { MokaBurgerMenu },
    props: ['el'],
    data:()=>({
        opacity: 'opacity-0',
        menuover: -1,
        menu_show: false
    }),
    computed:{
        ...mapState ( ['moka'] ),
        responsive_transition_settings(){
            let settings = window.localStorage.getItem('moka-settings')
            return this.moka.settings ?
                    this.moka.settings.responsive_menu_transition : 
                        settings ?
                            settings.responsive_menu_transition : 'fade'
        },
        responsive_css_settings(){
            let settings = window.localStorage.getItem('moka-settings')
            return this.moka.settings ?
                    this.moka.settings.responsive_menu_css : 
                        settings ?
                            settings.responsive_menu_css : ''
        }
    },
    methods:{
        showmenu(){
            this.menu_show =! this.menu_show
        },
        isOver(i){
            return i < 0 ? 'opacity-0' : this.menuover === i ? 'opacity-100' : 'opacity-0'
        },
        menu_responsive(menu){
            if ( menu.type === 'horizontal' && menu.responsive ) return 'hidden flex flex-col md:flex md:flex-row' 
            if ( menu.type === 'horizontal' && !menu.responsive ) return menu.css.container
            if ( menu.type === 'vertical' ) return 'flex flex-col'
        },
        

    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>