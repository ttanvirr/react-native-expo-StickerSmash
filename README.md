# 1. Overview

This is a React Native with Expo project that runs on Android, iOS, and web; all with a single codebase.

It covers the following topics:

- Create an app using the default template with TypeScript enabled
- Implement a two-screen bottom tabs layout with Expo Router
- Break down the app layout and implement it with flexbox
- Use each platform's system UI to select an image from the media library
- Create a sticker modal using the `<Modal>` and `<FlatList>` components from React Native
- Add touch gestures to interact with a sticker
- Use third-party libraries to capture a screenshot and save it to the disk
- Handle platform differences between Android, iOS, and web
- Finally, go through the process of configuring a status bar, a splash screen, and an icon to complete the app

# 2. Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

# 3. Start from scratch

## 3.1. Prerequisites

- Install [Expo Go](https://expo.dev/go) on a physical Android or iOS device.
- Install Node.js (LTS version) on your machine.
- VS Code or any code editor
- A macOS, Linux, or Windows (PowerShell and WSL2) with a terminal window open.
- Familiarity with TypeScript and React.

## 3.2. Initialize a new Expo app

Run `create-expo-app` to initialize a new Expo app. This will create a new React Native project:

```bash
npx create-expo-app@latest StickerSmash
cd StickerSmash
```

> During the installation process, CLI will prompt your to choose a template. Select SDK 57.

This command will create a new project directory named `StickerSmash`, using the default template.

Benefits of using default template:

- Creates a new React Native project with expo package installed
- Includes recommended tools such as Expo CLI
- Includes a tab navigator from Expo Router to provide a basic navigation system
- Automatically configured to run a project on multiple platforms: Android, iOS, and web
- TypeScript configured by default

## 3.3. Download assets

- Download assets archive from [this link](https://docs.expo.dev/static/images/tutorial/sticker-smash-assets.zip)

- Unzip the archive and replace the default assets in the `your-project-name/assets/images` directory.
- Open the project directory in a code editor or IDE.

## 3.4. Run reset-project script

Let's run the reset-project script to remove the boilerplate code:

```bash
npm run reset-project
```

`reset-project` script resets the `src/app` directory structure and moves the previous boilerplate files from the `src` directory to another sub-directory called `example`. We can delete it.

## 3.5. Run the app on mobile and web

In the project directory, run the following command to start the development server:

```bash
npx expo start
```

After running the above command:

1. The development server will start, and you'll see a QR code inside the terminal window.
2. Scan that QR code to open the app on the device. On Android, use the `Expo Go > Scan QR` code option. On iOS, use the default camera app.
3. To run the web app, press `W` in the terminal. It will open the web app in the default web browser.

Once it is running on all platforms, the app should look like this:

![alt text](doc_images/image01.png)

> [!TIP]
> Make sure you are on the same Wi-Fi network on your computer and your device. If it still doesn't work, it may be due to the router configuration — this is common for public networks.
>
> You can choose the Tunnel connection type when starting the development server, then scanning the QR code again.
>
> ```bash
> npx expo start --tunnel
> ```
>
> Using the Tunnel connection type will make the app reloads considerably slower than on LAN or Local, so it's best to avoid tunnel when possible. You may want to install and use an emulator or simulator to speed up development if Tunnel is required to access your machine from another device on your network.

## Make your first change

The `src/app/index.tsx` file is the entry point of our app and executes when the development server starts. It uses core React Native components such as `<View>` and `<Text>` to display background and text.

Styles applied to these components use JavaScript objects rather than CSS. Most React Native components accept a `style` prop that accepts a JavaScript object as its value.

Let's modify `src/app/index.tsx` screen:

- Add a `styles.container.backgroundColor` property to `<View>` with the value of `#25292e` to change the background color.
- Replace the default value of `<Text>` with "Home screen".
- Add a `styles.text.color` property to `<Text>` with the value of `#fff` (white) to change the text color.

`src/app/index.tsx`

```tsx
import { Text, View, StyleSheet } from "react-native"

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25292e", // new
  },
  // new
  text: {
    color: "#fff",
  },
})
```

Once you save your changes, they're applied to the running apps connected to the development server:

![alt text](doc_images/image02.png)
