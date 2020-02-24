## Overall App flow

- When the app launches first an animated Lottie file acts as loader while fetching initial upcoming-movie data
- On the List page, display upcoming movies, sorted by latest first.
- The List page allows for infinite scrolling.
- At the top search for movies by typing movie title text, this uses the search API. Search results will be displayed on the List page itself.
- When search is cancelled by clicking on the cross icon inside serch bar, it reverts back to showing all upcoming movies again
- When you click on a movie card, the app stack-navigate to the Details page showing movie details. Then the on-screen back button on the details page navigates the user back to the List page.

**Have used, Redux for state management and Thunk for middleware. Added 16 passing test, mostly to cover the Redux actions and Reducers and the util functions**

### To run all the tests, following command in root folder

```
npm run test
```

## For launching the Project in your local machine's Android Emulator. (Note, I have not tested the app in XCode and ios emulator)

- git clone the app (remove yarn.lock file if it exists).

Then open a Terminal in root folder and run Commands:-

```
yarn install
```

To link fonts and assets, run below command in root folder

```
react-native link
```

Then run

```
react-native start

```

Now after the above command the Metro bundler will start and it will say **Done** . Now in Terminal open a new tab in same project path.

And run Command

```

react-native run-android

```

## Possible Issue that may come up in launching project in Android Emulator and Solutions

### Possible Issue No - 1- If you get error debug.keystore missing

**Solution**

- If you get error debug.keystore missing follow [https://github.com/facebook/react-native/issues/25629](https://github.com/facebook/react-native/issues/25629)

You can generate the debug keystore by running this command in the android/app/ directory:

```

keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

```

### Possible Issue - Android Build Failed

If the app already ran once in your Android Emulator and then for a subsequent time, if after running `react-native run-android` you get error that **Android Build Failed** - which could be for any number of reasons, like "Package signatures do not match the previously installed version"

**Solution**

In your Android Emulator, you need to uninstall the installed App from the Emulator (that was previously installed) because you are using a different signature than the original. If it is not working it might be because it is still installed for another user on the device. So its just like the regular process of uninstalling a regular app from my Mobile. Inside Emulator > Go to Settings > Apps > Select it and Uninstall. And then from the Terminal launch the app again by running

```
react-native start

```

Now after the above command the Metro bundler will start and it will say **Done** . Now in Terminal open a new tab in same project path.

And run Command

```

react-native run-android

```

### Possible Issue No - 3 - To activate the initial Lottie file loader.

The package [lottie-react-native](https://github.com/react-native-community/lottie-react-native) is suppposed to link automatically. But sometime it may not.

If your app crashes on **Android**, means auto linking didn't work. Then follow their official documentation [lottie-react-native](https://github.com/react-native-community/lottie-react-native). You will need to make the following changes (I indeed had to do it in my local machine before the Lottie was showing up in my Android Emulator):

**android/app/src/main/java/\<AppName\>/MainApplication.java**

- add `import com.airbnb.android.react.lottie.LottiePackage;` on the imports section
- add `packages.add(new LottiePackage());` in `List<ReactPackage> getPackages()`;

**android/app/build.gradle**

add `implementation project(':lottie-react-native')` in the `dependencies` block

**android/settings.gradle**

add:

```
include ':lottie-react-native'
project(':lottie-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/lottie-react-native/src/android')

```

### Further areas to cover if I have more time to make the app more robust and hardened.

- A. Component level tests. Ideally I would try to achieve more than 80% to 90% test coverage

- E. Error handling is not enough in my current code. I would want to show to the user with a snackbar or some warning message the appropriate error messages.
- F. Fix bugs for all possible corner cases of bad data coming from external api.
