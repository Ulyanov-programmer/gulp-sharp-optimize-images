import { obj } from 'through2'
import sharp from 'sharp'
import Vinyl from 'vinyl'
import chalk from 'chalk'

const
  ALLOWED_EXTENSIONS = [
    '.gif',
    '.png',
    '.jpg', '.jpeg',
    '.webp',
    '.avif',
    '.tiff',
    '.heif',
  ],
  DEFAULT_CONVERSION_OPTIONS = {
    quality: 90,
    lossless: false,
    chromaSubsampling: '4:2:0',
  },
  DEFAULT_SHARP_OPTIONS = {
    animated: true,
    limitInputPixels: false,
  }


export default function sharpOptimizeImages(options) {
  let logLevel = options.logLevel ?? 'small'
  delete options.logLevel
  let optionObjects = Object.entries(options)

  return obj(async function (file, enc, callback) {
    if (!file) return callback(null, file)

    if (typeof options !== 'object')
      throw new Error('Invalid parameters, they must be an object.')

    if (!ALLOWED_EXTENSIONS.includes(file.extname)) {
      logAboutSuccessfulCopy(file, logLevel)
      return callback(null, file)
    }

    let originalFileExtname = file.extname.split('.').at(-1)


    for (let [format, props] of optionObjects) {
      let [convertFrom, convertTo] = format.split('_to_')

      if (!extnamesIsCorrect(convertFrom, convertTo)) {
        throw new Error('Invalid name of an object! Make sure you have spelled the extension names correctly.')
      }

      // Checking that the file has not a suitable extension
      if (convertTo && `.${convertFrom}` != file.extname) continue

      //? For general conversion rules such as png: {}
      if (!convertTo) {
        this.push(await convert(file, convertFrom, props))
        logAboutSuccessfulConversion(file, convertFrom, logLevel)

        if (props.alsoProcessOriginal) {
          this.push(await convert(file, originalFileExtname, props))
          logAboutSuccessfulConversion(file, originalFileExtname, logLevel)
        }
      }
      //? For specific conversion rules such as png_to_webp: {}
      else {
        this.push(await convert(file, convertTo, props))

        logAboutSuccessfulConversion(file, convertTo, logLevel)
      }
    }

    return callback()
  })
}

async function convert(file, newFileFormat, options) {
  let sharpInstance =
    sharp(file.contents, DEFAULT_SHARP_OPTIONS)
      .toFormat(newFileFormat, Object.assign(DEFAULT_CONVERSION_OPTIONS, options))

  return toVinyl(await sharpInstance.toBuffer(), newFileFormat, file)
}

function toVinyl(buffer, newFileFormat, file) {
  let newFileName = file.basename.substr(0, file.basename.lastIndexOf('.'))
    + '.' + newFileFormat

  return new Vinyl({
    cwd: file.cwd,
    base: file.base,
    path: `${file.dirname}\\${newFileName}`,
    contents: buffer,
  })
}


function extnamesIsCorrect(...extnames) {
  for (let extname of extnames) {
    if (extname && !ALLOWED_EXTENSIONS.includes('.' + extname))
      return false
  }

  return true
}

function logAboutSuccessfulConversion(file, newFileExtname, logLevel) {
  let filename = file.basename.split('.')[0]

  if (logLevel == 'full')
    console.log(
      'The file ' + chalk.green(file.path)
      + ' was processed to '
      + chalk.green(filename + '.' + chalk.bold(newFileExtname))
    )
  else if (logLevel == 'small')
    console.log(
      chalk.green(file.basename) + ' => ' + chalk.green.bold(newFileExtname)
    )
}
function logAboutSuccessfulCopy(file, logLevel) {
  if (logLevel == 'full')
    console.log(chalk.hex('#FF8800')
      (
        `The image ${chalk.bold(file.basename)} cannot be processed, so it is copied.`
      )
    )
  else if (logLevel == 'small')
    console.log(chalk.hex('#FF8800')
      (file.basename + ' => ' + chalk.bold('copied'))
    )
}