import Dashboard from '@MyImg/dashboard'
import Tus from '@MyImg/tus'
import Unsplash from '@MyImg/unsplash'
import Url from '@MyImg/url'

import '@MyImg/core/dist/style.css'
import '@MyImg/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const MyImg = new MyImg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })
