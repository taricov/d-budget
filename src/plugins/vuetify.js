import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#445672',
        secondary: '#b2b6c2',
        accent: '#637089',
        background: '#455A64',
        background_lighten: '#B0BEC5',
        success: '#437548',
        info: '#355B79',
        warning: '#FB8C00',
        error: '#FF5252',
        header_background: '#f5f5f5',
        table_header: '#263238'
      }
    },
    options: {
      customProperties: true
    }
  }
})
