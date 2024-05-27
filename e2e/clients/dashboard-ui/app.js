import MyImg from '@MyImg/core'
import Dashboard from '@MyImg/dashboard'
import RemoteSources from '@MyImg/remote-sources'
import Webcam from '@MyImg/webcam'
import ScreenCapture from '@MyImg/screen-capture'
import GoldenRetriever from '@MyImg/golden-retriever'
import ImageEditor from '@MyImg/image-editor'
import DropTarget from '@MyImg/drop-target'
import Audio from '@MyImg/audio'
import Compressor from '@MyImg/compressor'

import '@MyImg/core/dist/style.css'
import '@MyImg/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.MyImg.io'

const MyImg = new MyImg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access MyImg in tests
window.MyImg = MyImg
