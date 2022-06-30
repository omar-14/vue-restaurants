import Vue from 'vue'
import * as dialogs from '@/components/Dialogs'
import * as inputs from '@/components/Forms/Elements'
import { camelToKebab } from '@/utils'
for (const [key, value] of Object.entries(dialogs)) {
  // console.log(camelToKebab(key), key)
  Vue.component(camelToKebab(key), value)
}

for (const [key, value] of Object.entries(inputs)) {
  // console.log(camelToKebab(key), key)
  Vue.component(camelToKebab(key), value)
}
