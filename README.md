# gulp-sharp-optimize-images

> Compression and conversion of images for gulp using [sharp](https://www.npmjs.com/package/sharp).

## What is this
### With this thing you can: <br>
- Optimize your images
- Convert your images to other formats (including, but not limited to `.webp` and `.avif`).
### Features
- Using the [sharp](https://www.npmjs.com/package/sharp) plugin.
- Has a minimum of dependencies.
- Supported formats: `.gif .png .jpg/jpeg .webp .avif .tiff .heif`

## Why is this

- [imagemin](https://www.npmjs.com/package/imagemin) is unmaintained, [see the issue](https://github.com/imagemin/imagemin/issues/385)
- [gulp-libsquoosh](https://www.npmjs.com/package/gulp-libsquoosh) uses the outdated library [@squoosh/lib](https://www.npmjs.com/package/@squoosh/lib), which does not have support for node > 16.0.0. In addition, the squoosh lib is no longer maintained.
- [@donmahallem/gulp-sharp](https://www.npmjs.com/package/@donmahallem/gulp-sharp) does not have normal documentation.
- I have not found a single plugin that would simultaneously allow you to use the [sharp library](https://www.npmjs.com/package/sharp), convert and optimize images.


## How to use this
### Installation

```sh
$ npm install --D gulp-sharp-optimize-images
```

### Example

```js
import sharpOptimizeImages from 'gulp-sharp-optimize-images'
import gulp from 'gulp'

export function yourImages() {
  return gulp.src('yourSrcImagePath')
    .pipe(
      sharpOptimizeImages({
        jpg: {
          quality: 100,
          progressive: false,
          mozjpeg: true,
        },
        webp: {
          quality: 80,
          lossless: false,
        },
        avif: {
          quality: 100,
          lossless: true,
          effort: 4,
        }
      })
    )

    .pipe(gulp.dest('yourDistImagePath'))
}
```

## API
```js
sharpOptimizeImages({
  outputImageObject: {
    param: value,
  },
})
```

### outputImageObject
Type: `object`<br>
An object containing the name (format name) of an output image and its properties. <br>
Supported format names: 
- `png`
- `jpg` | `jpeg`
- `webp`
- `avif`
- `tiff`
- `heif`
- `gif`

### param
Type: `any` (depends on the parameter)<br>
Option for the output image. <br>
To get acquainted with all the available parameters, please take a look
https://sharp.pixelplumbing.com/api-output#jpeg