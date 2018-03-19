const fs = require("fs-extra")
const pkg = require("./package.json")

const assetsDir = pkg.RNSI_assetsDir
const projectName = pkg.RNSI_projectName

// const { promisify } = require("util")
// const sizeOf = promisify(require("image-size"))

function ensureDirectory (dir) {
	return fs.ensureDir(dir).catch(err => {
		console.error("Error in Checking Dir: ", err.Error)
	})
}

function ensureFile (file) {
	return fs.ensureFile(file).catch(err => {
		console.error("Error in Checking File: ", err.Error)
	})
}

// Future endeavors
// function ensureImageSize (img) {
// 	return sizeOf(img)
// 		.then(dimensions => {
// 			return { width: dimensions.width, height: dimensions.height }
// 		})
// 		.catch(err => {
// 			console.error("Error in Checking Image Size: ", err.Error)
// 		})
// }

function copyFiles (from, to, filter) {
	return fs.copy(from, to, { filter }).catch(err => {
		console.error("Error in Copying Files from", from, " :", err)
	})
}

function copyIOSSplash () {
	const srcDir = assetsDir + "ios/splash/"

	return ensureDirectory(srcDir).then(() => {
		if (projectName) {
			copyFiles(
				"./assets/images/ios/splash/",
				`./ios/${projectName}/Images.xcassets/LaunchImage.launchimage`
			)
		} else {
			console.log(
				"Please a valid Project Name in package.json. \n'RNSI': { 'projectName': 'dummyName' }"
			)
		}
	})
}

function copyIOSIcons () {
	return ensureDirectory("./assets/images/ios/splash/").then(() => {
		if (projectName) {
			copyFiles(
				"./assets/images/ios/splash/",
				`./ios/${projectName}/Images.xcassets/AppIcon.appiconset`
			)
		} else {
			console.log(
				"Please a valid Project Name in package.json. \n'RNSI': { 'projectName': 'dummyName' }"
			)
		}
	})
}

function copyAndroidSplash () {
	const baseDir = "./android/app/src/main/res/"
	const srcDir = "./assets/images/android/splash/"
	const splashDirs = [
		{ name: "drawable-ldpi", size: { width: 240, height: 320 } },
		{ name: "drawable-hdpi", size: { width: 480, height: 800 } },
		{ name: "drawable-mdpi", size: { width: 320, height: 480 } },
		{ name: "drawable-xhdpi", size: { width: 720, height: 1280 } },
		{ name: "drawable-xxhdpi", size: { width: 960, height: 1600 } },
		{ name: "drawable-xxxhdpi", size: { width: 1280, height: 1920 } }
	]

	splashDirs.forEach(splashDir => {
		ensureDirectory(srcDir).then(() => {
			ensureFile(baseDir + splashDir.name + "/screen.png").then(() => {
				copyFiles(srcDir + splashDir.name, baseDir + splashDir.name)
			})
		})
	})
}

function copyAndroidIcons () {
	const baseDir = "./android/app/src/main/res/"
	const srcDir = "./assets/images/android/icons/"
	const iconDirs = [
		{ name: "drawable", size: { width: 1024, height: 1024 } },
		{ name: "mipmap-hdpi", size: { width: 72, height: 72 } },
		{ name: "mipmap-mdpi", size: { width: 48, height: 48 } },
		{ name: "mipmap-xhdpi", size: { width: 96, height: 96 } },
		{ name: "mipmap-xxhdpi", size: { width: 144, height: 144 } }
	]

	iconDirs.forEach(iconDir => {
		ensureDirectory(srcDir).then(() => {
			ensureFile(baseDir + iconDir.name + "/icon.png").then(() => {
				copyFiles(srcDir + iconDir.name, baseDir + iconDir.name)
			})
		})
	})
}

copyIOSIcons()
copyIOSSplash()

copyAndroidIcons()
copyAndroidSplash()
