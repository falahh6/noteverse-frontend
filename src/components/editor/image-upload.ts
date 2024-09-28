import { createImageUpload } from 'novel/plugins'
import { toast } from 'sonner'

const sanitizeHeaderValue = (value: string) => {
  return value.replace(/[^\u0000-\u00FF]/g, '')
}

const onUpload = (file: File) => {
  console.log('@File : ', file)
  const promise = fetch('/api/upload', {
    method: 'POST',
    headers: {
      'content-type': file?.type || 'application/octet-stream',
      'x-vercel-filename': sanitizeHeaderValue(file?.name || 'image.png'),
    },
    body: file,
  })

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (res) => {
        // Successfully uploaded image
        if (res.status === 200) {
          const { url } = (await res.json()) as { url: string }
          // preload the image
          const image = new Image()
          image.src = url
          image.onload = () => {
            resolve(url)
          }
          // No blob store configured
        } else if (res.status === 401) {
          resolve(file)
          throw new Error(
            '`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.',
          )
          // Unknown error
        } else {
          throw new Error('Error uploading image. Please try again.')
        }
      }),
      {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully.',
        error: (e) => {
          reject(e)
          console.log(e.message)
          return e.message
        },
      },
    )
  })
}

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes('image/')) {
      toast.error('File type not supported.')
      return false
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error('File size too big (max 20MB).')
      return false
    }
    return true
  },
})
