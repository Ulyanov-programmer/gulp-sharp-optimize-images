# gulp-sharp-optimize-images

> Compression and conversion of images for gulp using [sharp](https://www.npmjs.com/package/sharp).

## What is this

### With this thing you can: <br>

- Optimize your images.
- Convert your images to other formats (including, but not limited to `.webp` and `.avif`).

### Features

- Using the [sharp](https://www.npmjs.com/package/sharp) plugin.
- Has a minimum of dependencies.
- Supported formats: `.png .jpg/jpeg .webp .avif .tiff .heif .gif`

## Why is this

- [imagemin](https://www.npmjs.com/package/imagemin) is unmaintained, [see the issue](https://github.com/imagemin/imagemin/issues/385).
- [gulp-libsquoosh](https://www.npmjs.com/package/gulp-libsquoosh) uses the outdated library [@squoosh/lib](https://www.npmjs.com/package/@squoosh/lib), which does not have support for node > 16.0.0. In addition, the squoosh lib is no longer maintained.
- [@donmahallem/gulp-sharp](https://www.npmjs.com/package/@donmahallem/gulp-sharp) does not have normal documentation.

## How to use this

### Installation

```sh
$ npm install --D gulp-sharp-optimize-images
```

### Example of usage

```js
import sharpOptimizeImages from "gulp-sharp-optimize-images";
import gulp from "gulp";

export function yourImages() {
  return gulp
    .src("yourSrcImagePath")
    .pipe(
      sharpOptimizeImages({
        webp: {
          quality: 80,
          lossless: false,
        },
        avif: {
          quality: 100,
          lossless: true,
          effort: 4,
        },
        jpg_to_heif: {
          quality: 90,
        },
        png_to_avif: {},

        jpg_to_jpg: {
          quality: 80,
          mozjpeg: true,
        },
      })
    )

    .pipe(gulp.dest("yourDistImagePath"));
}
```

## API

```js
sharpOptimizeImages({
  outputImageExtname: {
    param: value,
  },
  imageExtname_to_imageExtname: {
    param: value,
  },
});
```

### outputImageExtname

Type: `object`<br>
An object that allows you to convert `all` images into images of a `specific type`.
<br>
Also optimizes and transmits the original.
<br>

```js
// example, all images will be converted to avif. The originals will also be optimized and transferred.
avif: {
  param: value,
},
```

#### param

Type: `any` (depends on the parameter)<br>
Option for an output image. <br>
To get acquainted with all the available parameters, please take a look:
https://sharp.pixelplumbing.com/api-output#jpeg

### imageExtname_to_imageExtname

Type: `object`<br>
An object that allows you to convert images of a `specific type` into images of a `specific type`. <br>
Does not transmit the original. <br>

```js
// example, all images in the format .jpg will be converted to .heif
jpg_to_heif: {
  param: value,
},
// you can also optimize images without changing the extension
jpg_to_jpg: {
  param: value,
},
```

### Supported format names:

- `png`
- `jpg` | `jpeg`
- `webp`
- `avif`
- `tiff`
- `heif`
- `gif`

### If you find a bug, please create an issue [here](https://github.com/Ulyanov-programmer/gulp-sharp-optimize-images/issues).

### If this project was useful to you, you can give it a ★ in [repository](https://github.com/Ulyanov-programmer/gulp-sharp-optimize-images).
