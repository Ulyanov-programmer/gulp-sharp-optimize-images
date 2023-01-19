import { obj } from 'through2'
import sharp from 'sharp'
import Vinyl from 'vinyl'

const ALLOWED_EXTENTIONS = [
	'.gif',
	'.png',
	'.jpg', '.jpeg',
	'.webp',
	'.avif',
	'.tiff',
	'.heif',
]
const optionsByDefualt = {
	quality: 90,
	lossless: false,
	chromaSubsampling: '4:2:0'
}


export default function sharpOptimizeImages(options) {
	return obj(async function (file, enc, callback) {
		if (file.isNull()) {
			return callback(null, file)
		}
		if (ALLOWED_EXTENTIONS.includes(file.extname) == false) {
			console.error(`${file.basename} not supported, just copy.`)

			return callback(null, file)
		}
		if (typeof options !== 'object') {
			throw new Error('Invalid parameters, they must be an object.')
		}

		let convertedImages = []
		let optionObjects = Object.entries(options)

		for (let [optionObjectFormat, optionObjectProps] of optionObjects) {
			let convertedFile = await convert(file, optionObjectFormat, optionObjectProps)
			convertedImages.push(convertedFile)
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
			sharpInstance = sharpInstance.gif(Object.assign(optionsByDefualt, options))
			break
		case 'png':
			sharpInstance = sharpInstance.png(Object.assign(optionsByDefualt, options))
			break
		case 'jpg':
		case 'jpeg':
			sharpInstance = sharpInstance.jpeg(Object.assign(optionsByDefualt, options))
			break
		case 'webp':
			sharpInstance = sharpInstance.webp(Object.assign(optionsByDefualt, options))
			break
		case 'tiff':
			sharpInstance = sharpInstance.tiff(Object.assign(optionsByDefualt, options))
			break
		case 'avif':
			sharpInstance = sharpInstance.avif(Object.assign(optionsByDefualt, options))
			break
		case 'heif':
			sharpInstance = sharpInstance.heif(Object.assign(optionsByDefualt, options))
			break
		default:
			return false
	}

	let buffer = await sharpInstance.toBuffer()
	return toVinyl(buffer, newFileFormat, file)
}

function toVinyl(buffer, newFileFormat, file) {
	if (file.extname != '.' + newFileFormat) {
		file.extname = '.' + newFileFormat
	}

	return new Vinyl({
		cwd: file.cwd,
		base: file.base,
		path: file.path,
		contents: buffer,
	})
}