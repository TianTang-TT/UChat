import Vue from 'vue'

import Contact from './Contact.vue'
Vue.component('contact', Contact)

/*
function registerGlobalComp (require) {
  require.keys().forEach((comp) => {
    const vueComp = require(comp)
    const compName = vueComp.name ? vueComp.name : /\/([\w-]+)\.vue$/.exec(comp)[1]
    Vue.component(compName.toLowerCase(), vueComp)
  })
}
registerGlobalComp(require.context('./', false, /\.vue$/))
*/
