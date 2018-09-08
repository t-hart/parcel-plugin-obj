# Parcel .obj parser plugin

A naive .obj parser plugin for Parcel written as part of an assignment in graphics programming.

## Installation:
```sh
npm -i @t-hart/parcel-plugin-obj
```

## Usage
Use with [Parcel](https://parceljs.org/) and it should automatically just work.

In your source files:
```js
import obj from './your_model.obj'
```

This yields as standard JS object that has the following form:
```js
{
  v: number[],
  vt: number[],
  vn: number[],
  f: number[],
  colors: number[],
  min: number[3],
  max: number[3]
}
```
The object properties correspond to the .obj file values, with some differences:
- `colors` are based on the second half of the `v` lines. If there are 3 values following the position, a default value of `1` will be added as the alpha; if there are 4 values, the color is used as is; if the amount of values is anything else, it will default to a fully opaque white (`[1, 1, 1, 1]`)
- `min` and `max` contain the minimum and maximum values for each of the coordinates (x, y, z) respectively. This is useful for making a bounding box, for instance,
- `f` values are all returned as whatever is listed in the `.obj` file minus 1. This is due to how the `.obj` values are 1-indexed, whereas for my use case (WebGL), it needs to be 0-indexed. Further, the `f` values are only parsed up until the first non-number character (in this case, a `/`), and the remaining one or two values are discarded.

## Author
Thomas Hartmann
