import '@MyImg/core/dist/style.css'
import '@MyImg/dashboard/dist/style.css'
import Dashboard from '@MyImg/dashboard'
import AwsS3 from '@MyImg/aws-s3'



const MyImg = new MyImg()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
  })

