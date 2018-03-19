const fs = require("fs-extra")
const { promisify } = require("util")
const sizeOf = promisify(require("image-size"))

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

function ensureImageSize (img) {
	return sizeOf(img)
		.then(dimensions => {
			return { width: dimensions.width, height: dimensions.height }
		})
		.catch(err => {
			console.error("Error in Checking Image Size: ", err.Error)
		})
}

function copyFiles (from, to, filter) {
	return fs.copy(from, to, { filter }).catch(err => {
		console.error("Error in Copying Files from", from, " :", err)
	})
}

function copyIOSSplash (projectName) {
	return ensureDirectory("./assets/images/ios/splash/").then(() => {
		copyFiles(
			"./assets/images/ios/splash/",
			"./ios/Epicor/Images.xcassets/LaunchImage.launchimage"
		).catch(err => {
			console.log("Error in Copying iOS Splash: ", err)
		})
	})
}

function copyIOSIcons (projectName) {
	return ensureDirectory("./assets/images/ios/splash/").then(() => {
		copyFiles(
			"./assets/images/ios/splash/",
			`./ios/${projectName}/Images.xcassets/AppIcon.appiconset`
		).catch(err => {
			console.log("Error in Copying iOS Icons: ", err)
		})
	})
}

function copyAndroidSplash (projectName) {
	return ensureDirectory("./assets/images/ios/splash/").then(() => {
		copyFiles(
			"./assets/images/ios/splash/",
			"./ios/Epicor/Images.xcassets/LaunchImage.launchimage"
		).catch(err => {
			console.log("Error in Copying Android Splash: ", err)
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
				return copyFiles(
					srcDir + iconDir.name,
					baseDir + iconDir.name
					// async (src, dest) => {
					// 	console.log("====================================")
					// 	console.log(baseDir + iconDir.name + "/icon.png")
					// 	console.log("====================================")
					// 	const { width, height } = await ensureImageSize(src)
					// 	return iconDir.size.width === width && iconDir.size.height === height
					// }
				)
			})
		})
	})
}

copyAndroidIcons()
