<template>
    <div class="flex flex-col">
        <label>Action</label>
        <input class="w-full xs" type="text" v-model="editor.current.action"/>
        <label>Success message</label>
        <input class="w-full" type="text" v-model="editor.current.success"/>
        <label>Redirect to</label>
        <input class="w-full" type="text" v-model="editor.current.redirect"/>
        <label>Error message</label>
        <input class="w-full" type="text" v-model="editor.current.error"/>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaEditorFormSettings',
    data: ()=>({
    }),
    computed:{
        ...mapState ( ['editor'] )
    },
}
</script>

