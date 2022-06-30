import Vue from 'vue'
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/es.json'

import {
  getValidateCollectionTemplate
} from '@/api/collectionTemplate'

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('key', {
  validate: async (value, args) => {
    console.log(args)
    const params = {
      key: value
    }
    if (args._id !== undefined) { params._id = args._id }

    const valid = await getValidateCollectionTemplate(params).then(response => {
      return response.data
    })
    return valid
  },
  message: 'This key Exist',
  params: ['_id']
})

extend('https', {
  validate: value => {
    // eslint-disable-next-line prefer-regex-literals
    const regexp = new RegExp(/^(https:\/\/)([\da-z.-]+\.[a-z.]{2,6}|[\d.]+)([/:?=&#]{1}[\da-z.-]+)*[/?]?$/, 'i')

    return regexp.test(value)
  },
  message: 'The {_field_} field must be a valid URL secure'
})

extend('http', {
  validate: value => {
    // eslint-disable-next-line prefer-regex-literals
    const regexp = new RegExp(/^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6}|[\d.]+)([/:?=&#]{1}[\da-z.-]+)*[/?]?$/, 'i')

    return regexp.test(value)
  },
  message: 'The {_field_} field must be a valid URL'
})

// extend('required', {
//   ...required,
//   message: 'This field is required'
// })

// extend('email', {
//   ...email,
//   message: 'This field must be a valid email'
// })

// extend('confirmed', {
//   ...confirmed,
//   message: 'This field confirmation does not match'
// })

// extend('length', {
//   ...length,
//   message: 'This field must have 2 options'
// })
