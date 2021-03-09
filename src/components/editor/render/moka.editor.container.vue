<template>
    <div 
        v-if="doc"
        :level="$attrs.level"  
        :class="'p-2 fill-current ' + classe(doc.css)" :style="doc.style + ' ' +  background(doc)" @dblclick="doc.blocks.length===0?$action('addcomponent'):null" >
        <div v-if="doc.blocks && !doc.blocks.length && !doc.image" class="text-xs">Dblclick here to add an element</div>
        <template v-for="(block,b) in doc.blocks">

            <moka-element
                v-if="block && !block.hasOwnProperty('blocks') || ( block.hasOwnProperty('items') && !doc.hasOwnProperty('slider') && !block.hasOwnProperty('blocks_flip') && !block.hasOwnProperty('plugin') )"
                :component="$attrs.component"
                :key="block.id"
                :element="block" 
                :coords="[b]"
                :develop="true"
                :level="parseInt($attrs.level)+1" 
                @selected="setCurrent(block),$store.dispatch('setCurrent',block),$store.dispatch('selected',block.id)"
                @customize="customize"
                :parent="[doc.blocks,b]"
                @copy="$emit('copy')"
                @animation="$emit('animations')"
                @delete="$emit('delete')" 
                @editinline="setCurrent(block),edit"/> 
            
            <moka-container
                :key="block.id"
                :component="$attrs.component"
                :top="false"
                :root="$attrs.root||false"
                :coords="coords"
                :slide="$attrs.slide"
                :flipbox="doc.hasOwnProperty('blocks_flip')? true : false" 
                :index="b"
                :level="parseInt($attrs.level)+1" 
                :zi="$attrs.zi + parseInt($attrs.level)"
                v-if="block && block.hasOwnProperty('blocks') && !block.hasOwnProperty('items')  && !block.hasOwnProperty('slider') && !block.hasOwnProperty('blocks_flip')" 
                :doc="block"
                @copy="$emit('copy')"/>

            
            <!--<moka-editor-slides
                v-if="block && block.hasOwnProperty('slider')" 
                :doc="block"
                @remove="doc.blocks.splice(b,1)"/>-->

              
            <moka-slides-container
                :key="block.id"
                :component="$attrs.component"
                :top="false"
                :root="$attrs.root||false"
                :coords="coords"
                :slide="$attrs.slide" 
                :index="b"
                :level="parseInt($attrs.level)+1" 
                :zi="$attrs.zi + parseInt($attrs.level)"
                v-if="block && block.hasOwnProperty('slider') && !block.hasOwnProperty('blocks_flip')" 
                :doc="block"/>
                
            <moka-editor-flipbox
                v-if="block.hasOwnProperty('blocks_flip')"
                :key="block.id"
                :doc="block"
                :component="$attrs.component"
                :top="false"
                :root="$attrs.root||false"
                :coords="coords"
                :slide="$attrs.slide" 
                :index="b"
                :level="parseInt($attrs.level)+1" 
                :zi="$attrs.zi + parseInt($attrs.level)"/>
            
            <!--<moka-plugins-wrapper :plugin="block" :name="block.plugin" v-if="block.type === 'plugin' && typeof block.plugin === 'string'"/>-->
            
        </template>
       
        <div :class="'absolute transform border-2 border-dashed top-0 left-0 bottom-0 right-0 z-' + zindex + ' scale-x-' + (105-root) + ' ' + active(doc.id,doc)" @click="setCurrent(doc)" v-if="doc && !doc.hasOwnProperty('items')"  @contextmenu="$contextMenu($event,doc,'customize')">
            <!--{{ $attrs.level }} {{ $attrs.index }}-->
            
            <span v-if="doc && doc.hasOwnProperty('loop') && doc.loop" class="text-xs"><i class="material-icons">article</i> 
                <span v-if="!doc.hasOwnProperty('collection')">Article Loop</span>
                <span v-else>{{ doc.collection }} Loop</span>
            </span>
            
            <span v-if="doc && doc.hasOwnProperty('blocks_flip')" class="text-xs"><i class="material-icons">flip_camera_android</i> Flipbox</span>
            
            <div class="h-2 w-2 absolute top-0 right-0 bg-black rounded-full -m-1" @click="moveUp(doc.id)"></div>
            
            <div class="h-3 w-3 absolute top-0 left-0 bg-blue-500 rounded-full -m-2" @dblclick="$action('addcomponent')" title="Dblclick to add an element"></div>
            
            <div class="h-2 w-2 absolute bottom-0 right-0 bg-black rounded-full -m-1"></div>
            <div class="h-2 w-2 absolute bottom-0 left-0 bg-black rounded-full -m-1"></div>
            <moka-floating-bar 
                v-if="doc.id===moka.selected" 
                :doc="doc" 
                @moveup="moveUp(doc.id)"/>
           
            <!--<div class="absolute bottom-0 left-0 -mb-4 text-xs" v-if="doc.gsap && doc.gsap.animation">{{ doc.gsap.animation }}</div>
            -->
            <span v-if="doc && doc.hasOwnProperty('slider')" class="px-4 py-1 rounded-xl text-sm bg-yellow-500">SLIDER</span>
            <div v-if="doc.type==='grid'" class="opacity-100 hover:opacity-100 border rounded-tl rounded-bl bg-gray-800 absolute left-0 top-0 -mx-5 text-black flex flex-col" style="top:50%;transform:translateY(-50%)">
                <i class="material-icons hover:bg-blue-200 text-gray-200 hover:text-gray-700" @click="move(true)">expand_less</i>
                <i class="material-icons hover:bg-blue-200 text-gray-200 hover:text-gray-700" @click="move(false)">expand_more</i>
            </div>
            <!--
            <div class="absolute left-0 bottom-0 -mb-6 rounded-xl items-center flex text-sm z-2xtop bg-gray-800 text-gray-300 px-2" v-if="$attrs.flipside > -1" @click="$attrs.flipside?$attrs.flipside=0:$attrs.flipside=1">
                <i class="material-icons mr-2">flip_camera_android</i> 
                <span :class="$attrs.flipside?'text-red-400':'text-lime-400'">{{ $attrs.flipside ? 'Backside' : 'Frontside' }}</span>
            </div>-->
        </div> 
        
    </div>

</template>

<script>
import MokaElement from '@/components/editor/render/moka.editor.element'
import MokaSlider from '@/components/editor/preview/moka.slider'
import MokaEditorSlides from '@/components/editor/render/moka.editor.slides'
import MokaEditorFlipbox from '@/components/editor/render/moka.editor.flipbox'
import MokaSlidesContainer from '@/components/editor/render/moka.editor.slides'
import MokaFloatingBar from './moka.editor.floating.bar'
import MokaPluginsWrapper from '@/components/Plugins.Wrapper'
import { mapState } from 'vuex'
import jp from 'jsonpath'

export default {
    name: 'MokaContainer',
    components: { MokaElement , MokaSlider , MokaEditorSlides , MokaEditorFlipbox , MokaSlidesContainer , MokaFloatingBar , MokaPluginsWrapper },
    props: [ 'doc' , 'coords' ,'pos' ],
    data:()=>({
        index: 0,
        position: null
    }),
    computed:{
        ...mapState(['moka','editor']),
        zindex(){
            return this.$attrs.level < 1 ? 'auto' : this.$attrs.level < 2 ? 1 : 
                this.$attrs.level //    this.$attrs.zi
        },
        root(){
            return this.$attrs.top ? 0 : parseInt(this.$attrs.level)
        }
        
    },
    methods:{
        moveUp(id){
            var parent = jp.parent ( this.$attrs.component , '$..blocks[?(@.id=="' + id + '")]' )
            console.log ( parent , id )
            if ( parent.length === 1 ) return
            let i
            parent.forEach ( (p,index) => {
                if ( p.id === id ){
                    i = index
                }
            })
            if ( i > 0 ){
                let obj = Object.assign({},this.doc)
                parent.splice(i,1)
                parent.splice(i-1,0,this.doc)
            }
        },
        classe(css){
            if ( !css ) return 'relative'
            let cl = css.hasOwnProperty('css') ? css.css + ' ' + css.container : css
            cl.replace('z-','')
            cl.indexOf('absolute') > -1 ? cl += ' absolute' : cl += ' relative'
            return cl.replace('modal','').replace('hidden','')
        },
        setCurrent(el){ 
            let level = this.coords
            level.push ( this.$attrs.index )
            this.$store.dispatch( 'selected' , el.id )
            this.$store.dispatch('setLevel',level)
            this.$store.dispatch ( 'setCurrent' , el )
            
            this.$emit('selected',el)
        },
        
        setCurrentElement (el){
            this.$store.dispatch( 'selected' , el.id )
            this.$emit ( 'selected' , el )
        },
        
        arraySwap ( arr , from , to ){
            return arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
        },
        move(flag){
            let coord = []
            coord = coord.concat(this.coords)
            coord.push ( this.$attrs.index )
            let test = Object.assign({} , this.$attrs.component)
            let arr
            !this.$attrs.top ?
                arr = test.blocks[coord[1]].blocks[0].blocks :
                    arr = test.blocks 
            
            let source = arr[coord[coord.length-1]]
            let pos = coord[coord.length-1]
            if ( flag ){
                if ( pos > 0 ){     
                    arr.splice(pos-1,0,source)
                    arr.splice(pos+1,1)
                }
            } else {
                if ( pos < arr.length-1 ){
                    arr.splice(pos,1,arr.splice(pos+1, 1, arr[pos])[0])
                    
                }
            }
            !this.$attrs.top ?
                        test.blocks[coord[1]].blocks[0].blocks = arr :
                            test.blocks = arr
            return
            
            
        },
        /*
        blocksLen(obj,coord){
            let o = this.doc
            let len = 0
            coord.forEach ( index => {
                if ( o.hasOwnProperty ( 'blocks' ) ){
                    o = o.blocks
                    if ( o.length ) len = o.length
                    o = getObj (o,index)
                }
            })
            return len

            function getObj(obj,index){
                return obj[index]
            }
        },
        */
        customize(){
            console.log ( 'element customize')
            this.$emit('customize')
        },
        edit(block){
            this.$store.dispatch( 'selected' , block.id )
            this.$store.dispatch ( 'current' , block )
            this.$emit('selected',block)
            this.$emit('edit',block)
        },
        active(id,doc){
            if ( !doc ) return 
            let color = 'border-blue-500 '
            doc && !doc.hasOwnProperty('type') ? color = 'border-red-500 ' : null
            doc && doc.hasOwnProperty('slider') ? color = 'border-yellow-500 ' : null
            doc && doc.hasOwnProperty('popup') ? color = 'border-teal-200 ' : null
            doc.type === 'flex' ?
                doc.hasOwnProperty('popup') ? color = 'border-teal-200 border-2 ' :
                    color = 'border-red-500 border-2 bg-gray-300 bg-opacity-25 ' : ''
            if ( this.moka && this.moka.selected ) {
                return this.moka.selected === id ? color + 'opacity-100 ' : color + 'opacity-0 hover:opacity-100'
            } else {
                return color + 'opacity-0 hover:opacity-100 '
            }
        },
        stile(block,doc){
            if ( !block || !doc ) return 
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            if ( !block ) return 
            
            return block.hasOwnProperty('image') ?
                block.image && block.image.url ? 
                    this.setImageBackground ( block.image ) : '' : ''

                        //' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' + this.isSvg(block.image) :
                        //    ' background-image:url(' + block.image.url + ');' : ''  : ''        
        },
        setImageBackground(image){ 
            if ( !image ) return ''
            //let theImg = image.hasOwnProperty('previewUrl')  && image.previewUrl ? image.previewUrl : image.url
            let response = ' background-image:url(' +  this.$imageURL(image) + ')' //theImg + ');'
            return response
        },
        pluginComponent(block){
            if ( block.plugin ){
                console.log ( block )
                if ( typeof block.plugin === 'string' ){
                    let name = block.plugin + '.editor'
                    console.log ( '@/components/plugins/' + name )
                    return MokaTest
                    let component =  import(/* webpackChunkName: 'nuxpresso_' */ '@/components/plugins/' + name ) 
                    return component ? component : false
                    //return component
                }
            }
            return false

        }
    },
    mounted(){
        /*
        window.addEventListener("keydown", e => {
            
            if ( e.altKey && e.code === 'ArrowDown' ){
                this.editor.current && this.editor.current.type === 'grid' ?
                    this.move(false) :
                        null
            }
        })
        */
    }

}
</script>