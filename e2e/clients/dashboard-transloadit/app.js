import { MyImg } from '@MyImg/core'
import Dashboard from '@MyImg/dashboard'
import Transloadit from '@MyImg/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@MyImg/core/dist/style.css'
import '@MyImg/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const MyImg = new MyImg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access MyImg in tests
window.MyImg = MyImg
