import Dashboard from '@MyImg/dashboard'
import AwsS3Multipart from '@MyImg/aws-s3-multipart'

import '@MyImg/core/dist/style.css'
import '@MyImg/dashboard/dist/style.css'

//#TODO tests
const MyImg = new MyImg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3Multipart, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
    // This way we can test that the user provided API still works
    async prepareUploadParts (file, { uploadId, key, parts, signal }) {
      const { number: partNumber, chunk: body } = parts[0]
      const plugin = MyImg.getPlugin('AwsS3Multipart')
      const { url } = await plugin.signPart(file, { uploadId, key, partNumber, body, signal })
      return { presignedUrls: { [partNumber]: url } }
    },
  })

// Keep this here to access MyImg in tests
window.MyImg = MyImg
