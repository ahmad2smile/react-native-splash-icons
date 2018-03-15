const fs = require("fs-extra")
const { promisify } = require("util")
const sizeOf = promisify(require("image-size"))

function ensureDirectory (dir) {
	return fs
		.ensureDir(dir)
		.then(() => {
			console.log("success!")
		})
		.catch(err => {
			console.error(err)
		})
}

function ensureFile (file) {
	return fs
		.ensureFile(file)
		.then(res => {
			console.log("File ensure success!", res)
		})
		.catch(err => {
			console.error(err)
		})
}

function ensureImageSize (img) {
	return sizeOf(img)
		.then(dimensions => {
			console.log(dimensions.width, dimensions.height)
			return { width: dimensions.width, height: dimensions.height }
		})
		.catch(err => console.error(err))
}

function copyFiles (from, to) {
	return fs
		.copy(from, to)
		.then(() => {
			console.log("success!")
		})
		.catch(err => {
			console.error(err)
		})
}

const images = [
	"./Default-568h@2x.png",
	"./Default-568h@2x~iphone.png",
	"./Default-667h.png",
	"./Default-736h.png",
	"./Default-Landscape-736h.png",
	"./Default-Landscape@2x.png",
	"./Default-Landscape@2x~ipad.png",
	"./Default-Landscape~ipad.png",
	"./Default-Portrait@2x~ipad.png",
	"./Default-Portrait~ipad.png",
	"./Default@2x~iphone.png",
	"./Default~iphone.png"
]

const imgSizes = [
	{ width: 320, height: 480 },
	{ width: 640, height: 960 },
	{ width: 640, height: 1136 },
	{ width: 640, height: 1136 },
	{ width: 750, height: 1334 },
	{ width: 768, height: 1024 },
	{ width: 1024, height: 768 },
	{ width: 1242, height: 2208 },
	{ width: 1536, height: 2048 },
	{ width: 2208, height: 1242 },
	{ width: 2048, height: 1536 },
	{ width: 2048, height: 1536 }
]

images.map(img => {
	ensureFile(img).then(() => {
		ensureImageSize(img).then(imgs => {
			console.log("====================================")
			console.log(Array.from(new Set(imgSizes)))
			console.log("====================================")
		})
	})
})

// ensureDirectory("./ios/Scheduling//Images.xcassets/LaunchImage.launchimage")
