declare function sharpOptimizeImages(params: SharpOptimizeImagesInputTypes): internal.Transform

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
  lossless?: boolean
  progressive?: boolean
  chromaSubsampling?: string
  mozjpeg?: boolean
  effort?: number
  reuse?: boolean
  delay?: number | Array.<number>
  force?: boolean
}

export {
  sharpOptimizeImages,
}