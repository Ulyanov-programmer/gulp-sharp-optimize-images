import { obj } from 'through2'
import sharp from 'sharp'
import Vinyl from 'vinyl'

const ALLOWED_EXTENSIONS = [
  '.gif',
  '.png',
  '.jpg', '.jpeg',
  '.webp',
  '.avif',
  '.tiff',
  '.heif',
]
const optionsByDefault = {
  quality: 90,
  lossless: false,
  chromaSubsampling: '4:2:0'
}


export default function sharpOptimizeImages(options) {
  return obj(async function (file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }
    if (ALLOWED_EXTENSIONS.includes(file.extname) == false) {
      console.error(`${file.basename} not supported, just copy.`)

      return callback(null, file)
    }
    if (typeof options !== 'object') {
      throw new Error('Invalid parameters, they must be an object.')
    }

    let convertedImages = []
    let optionObjects = Object.entries(options)

    for (let [optionObjectFormat, optionObjectProps] of optionObjects) {
      let splittedObjectName = optionObjectFormat.split('_to_')
      let convertFromOfGeneralExtname = splittedObjectName[0]
      let convertToExtname = splittedObjectName[1]

      if (extnamesIsCorrect(convertFromOfGeneralExtname, convertToExtname) == false) {
        throw new Error('Invalid name of an object! Make sure you have spelled the extension names correctly.')
      }

      if (convertToExtname == undefined) {
        let optimizedFile = await convert(file, file.extname.replace('.', ''), optionObjectProps)
        let convertedFile = await convert(file, convertFromOfGeneralExtname, optionObjectProps)

        convertedImages.push(optimizedFile, convertedFile)
      }
      else if (file.extname == `.${convertFromOfGeneralExtname}`) {
        let convertedFile = await convert(file, convertToExtname, optionObjectProps)
        convertedImages.push(convertedFile)
      }
    }

    for (let convertedImage of convertedImages) {
      this.push(convertedImage)
    }

    return callback()
  })
}

async function convert(file, newFileFormat, options) {
  let sharpInstance = sharp(file.contents, { animated: true, limitInputPixels: false, })

  switch (newFileFormat) {
    case 'gif':
      sharpInstance = sharpInstance.gif(Object.assign(optionsByDefault, options))
      break
    case 'png':
      sharpInstance = sharpInstance.png(Object.assign(optionsByDefault, options))
      break
    case 'jpg':
    case 'jpeg':
      sharpInstance = sharpInstance.jpeg(Object.assign(optionsByDefault, options))
      break
    case 'webp':
      sharpInstance = sharpInstance.webp(Object.assign(optionsByDefault, options))
      break
    case 'tiff':
      sharpInstance = sharpInstance.tiff(Object.assign(optionsByDefault, options))
      break
    case 'avif':
      sharpInstance = sharpInstance.avif(Object.assign(optionsByDefault, options))
      break
    case 'heif':
      sharpInstance = sharpInstance.heif(Object.assign(optionsByDefault, options))
      break
    default:
      return false
  }

  let buffer = await sharpInstance.toBuffer()
  return toVinyl(buffer, newFileFormat, file)
}

function toVinyl(buffer, newFileFormat, file) {
  let newFileName = file.basename.substr(0, file.basename.lastIndexOf(".")) + `.${newFileFormat}`
  let newFilePath = `${file.dirname}/${newFileName}`

  return new Vinyl({
    cwd: file.cwd,
    base: file.base,
    path: newFilePath,
    contents: buffer,
  })
}


function extnamesIsCorrect(...extnames) {
  for (let extname of extnames) {
    if (extname && ALLOWED_EXTENSIONS.includes(`.${extname}`) == false) {
      return false
    } else {
      return true
    }
  }
}