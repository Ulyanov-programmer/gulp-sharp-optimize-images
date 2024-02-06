declare function sharpOptimizeImages(params: SharpOptimizeImagesInputTypes)

interface SharpOptimizeImagesInputTypes {
  gif: SharpOptimizeImagesTypesParams
  png: SharpOptimizeImagesTypesParams
  jpg: SharpOptimizeImagesTypesParams
  jpeg: SharpOptimizeImagesTypesParams
  webp: SharpOptimizeImagesTypesParams
  avif: SharpOptimizeImagesTypesParams
  tiff: SharpOptimizeImagesTypesParams
  heif: SharpOptimizeImagesTypesParams
}

interface SharpOptimizeImagesTypesParams {
  quality?: number
  logLevel?: string
  alsoProcessOriginal?: boolean
  lossless?: boolean
  progressive?: boolean
  chromaSubsampling?: string
  mozjpeg?: boolean
  effort?: number
  reuse?: boolean
  delay?: number | Array<number>
  force?: boolean
}

export default sharpOptimizeImages

export {
  sharpOptimizeImages
}