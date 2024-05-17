import Compressor from '@MyImg/compressor'
import Dashboard from '@MyImg/dashboard'
import '@MyImg/core/dist/style.css'
import '@MyImg/dashboard/dist/style.css'

const MyImg = new MyImg()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access MyImg in tests
window.MyImg = MyImg
