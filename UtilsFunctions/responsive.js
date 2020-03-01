import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native"

// Retrieve initial screen's width
let screenWidth = Dimensions.get("window").width

// Retrieve initial screen's height
let screenHeight =
  Platform.OS == "ios"
    ? Dimensions.get("window").height
    : Dimensions.get("window").height - StatusBar.currentHeight

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent)

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that corresponds to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent)

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class component this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
const listenOrientationChange = that => {
  Dimensions.addEventListener("change", newDimensions => {
    // Retrieve and save new dimensions
    screenWidth = newDimensions.window.width
    screenHeight = newDimensions.window.height

    // Trigger screen's rerender with a state update of the orientation variable
    that.setState({
      orientation: screenWidth < screenHeight ? "portrait" : "landscape",
    })
  })
}

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
const removeOrientationListener = () => {
  Dimensions.removeEventListener("change", () => {})
}

export {
  widthPercentageToDP,
  heightPercentageToDP,
  listenOrientationChange,
  removeOrientationListener,
}

/*
For the above refer to -
1. https://medium.com/react-native-training/build-responsive-react-native-views-for-any-device-and-support-orientation-change-1c8beba5bc23



2. https://github.com/marudy/react-native-responsive-screen/blob/master/index.js

"The code behind the package
If you want to check the source code of these methods and how they work have a look below. The code is actually pretty small and that’s what triggered me to create a package out of them; a small, easy to use package for responsiveness."

MORE EXPLANATION ON THE ABOVE

The two most important functions we need for making a responsive layout are widthPercentageToDP and heightPercentageToDP.

widthPercentageToDP takes in a percentage of a screen's width that a UI element should cover and returns a calculated, DP depending on the current device's screen width.

Similarly, heightPercentageToDP takes in a percentage of a screen's height that a UI element should cover and returns a calculated DP, depending on the current device's screen height.

Consider an example where the device has a width of 480 DP. If we do

<View style={{width: widthPercentageToDP('80%')}} />

then it will be translated to

<View style={{width: 384 }} />

because 80% of 480 = (80/100) * 480 = 384 DP

So no matter what the device width is, the above View will translate it to 80% of its device’s width. Similarly, if you use heightPercentageToDP instead of widthPercentageToDP, then it will translate accordingly to the device's height. This way, UI elements scale up and down depending on device resolutions.

 "dp" means - Density-independent Pixel. More infomation -developer.android.com/guide/practices/screens_support.html .. To develop native android apps, we use this in xml's to set layouts.

 Independent pixels (dp) on the other hand, are not the classic screen pixels (px) that we become accustomed to as web developers. They mathematically connect to screen pixels and the screen’s scale factor through the following equation:

px = dp * scaleFactor

DP can not be used for responsive UI development as someone might think at this point. That is because scaleFactor actually depends on screen’s pixel density,

And that happens in a performant way; the package makes sure to calculate screen’s width and height once when the app is initialized and every time the methods are used it simply calls these values to make the calculation instead of identifying them again.

 */
