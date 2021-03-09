<template>
    <div :data="hasProjects">
        <moka-modal v-if="!createProject"
            position="bottom-right"
            size="sm"
            :close="false"
            buttons="none">
            <div slot="title">Select a Projects</div>
            <div slot="content">
                <template v-for="proj in moka.e_data.projects">
                    {{ proj.name }}
                </template>
            </div>
        </moka-modal>
        <moka-modal
            buttons="saveonly"
            :close="false"
            v-if="createProject"
            @click_0="saveProject">
            <div slot="title">New Project</div>
            <div slot="content" class="flex flex-col">
                You need to create a project to work on.
                <template v-for="field in fields">
                    <div class="py-1 flex justify-start">
                        <label class="w-24 capitalize">{{field.label}}</label>
                        <input v-if="field.hasOwnProperty('type')":type="field.type" v-model="project[field.name]"/>
                        <input :placeholder="field.placeholder" class="w-full" v-else type="text" v-model="project[field.name]"/>
                    </div>
                </template>
            </div>
        </moka-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaProjects',
    data:()=>({
        createProject: false,
        project: {},
        fields:[
            { name: 'name' , label: 'name' , placeholder: 'project name' },
            { name: 'path' , label: 'path' , placeholder: 'destination folder path'},
            { name: 'description' , label: 'description' , placeholder: 'short description'},
            { name: 'strapi' , label: 'Strapi URL' , placeholder: 'if using Strapi set the url'},
            { name: 'domain' , label: 'domain' , placeholder: 'domain name like example.com'},
            { name: 'repo' , label: 'repo' , placeholder: 'repo destination url'},
            { name: 'store' , label: 'store' , type: 'checkbox' , display: 'flex-row'}
        ]
    }),
    computed:{
        ...mapState ( ['moka'] ),
        hasProjects(){
            !this.moka.e_data || !this.moka.e_data.projects ? this.createProject = true : this.createProject = false
            return true
        }
    },
    methods: {
        saveProject(){
            this.$create ( 'projects' , this.project )
        }
    },
    mounted(){
        this.fields.forEach ( field => {
            this.project[this.$clean(field.name).toLowerCase()] = ''
        })
    }

}
</script>