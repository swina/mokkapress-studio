import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/tailwind.css'
import '@/assets/fonts/fonts.css'

import './plugins'
import api from "./plugins/api";

//import MokaPluginWrapper from '@/components/Plugins.Wrapper'
//Vue.component('moka-plugins-wrapper',MokaPluginWrapper)

import VueUploadComponent from 'vue-upload-component'
Vue.component('file-upload', VueUploadComponent)

import LoadingSpinner from '@/components/loading'
Vue.component('moka-loading',LoadingSpinner)

import MokaModal from '@/components/modal'
Vue.component ( 'moka-modal' , MokaModal )

api.defaults.timeout = 10000;
Vue.prototype.$http = api 



import VueBlobJsonCsv from 'vue-blob-json-csv'
Vue.use(VueBlobJsonCsv)

import _ from 'lodash';    
Object.defineProperty(Vue.prototype, '$_', { value: _ });




import VueDraggableResizable from 'vue-draggable-resizable'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)


import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


// Cache implementation
const cache = new InMemoryCache()


const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: window.localStorage.getItem('moka-strapiurl') + 'graphql' || process.env.VUE_APP_GRAPHQL  //|| 'http://localhost:1337/graphql',
})
// HTTP connection to the API

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

import MokaMedia from '@/components/media/media'
Vue.component('MokaMedia', MokaMedia )

import VueHtml2Canvas from "vue-html2canvas";
Vue.use(VueHtml2Canvas);
console.log ( 'Strapi CMS => ' , window.localStorage.getItem ( 'moka-strapiurl') || process.env.VUE_APP_API_URL )
import {SimpleSVG} from 'vue-simple-svg'
Vue.component('simple-svg', SimpleSVG)

import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
Vue.use ( VueFileAgent )
//import './registerServiceWorker'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
