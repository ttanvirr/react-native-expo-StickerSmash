# Table of contents <!-- omit in toc -->

- [1. Overview](#1-overview)
- [2. Get started](#2-get-started)
- [3. Start from scratch](#3-start-from-scratch)
  - [3.1. Prerequisites](#31-prerequisites)
  - [3.2. Initialize a new Expo app](#32-initialize-a-new-expo-app)
  - [3.3. Download assets](#33-download-assets)
  - [3.4. Run reset-project script](#34-run-reset-project-script)
  - [3.5. Run the app on mobile and web](#35-run-the-app-on-mobile-and-web)
  - [3.6. Make your first change](#36-make-your-first-change)
  - [3.7. Add navigation](#37-add-navigation)
    - [3.7.1. Expo Router basics](#371-expo-router-basics)
    - [3.7.2. Add a new screen to the stack](#372-add-a-new-screen-to-the-stack)
    - [3.7.3. Navigate between screens](#373-navigate-between-screens)
    - [3.7.4. Add a not-found route](#374-add-a-not-found-route)
    - [3.7.5. Add a bottom tab navigator](#375-add-a-bottom-tab-navigator)
    - [3.7.6. Install @expo/vector-icons](#376-install-expovector-icons)
    - [3.7.7. Update bottom tab navigator appearance](#377-update-bottom-tab-navigator-appearance)

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

## 3.6. Make your first change

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

Commit changes.

## 3.7. Add navigation

In this section, we'll see Expo Router's fundamentals to create stack navigation and a bottom tab bar with two tabs.

### 3.7.1. Expo Router basics

Expo Router is a file-based routing framework. To get started, we need to know about the following conventions:

- `app` directory: A special directory containing only routes and their layouts. Any files added to this directory become a screen inside our native app and a page on the web. In the default template, it is located at `src/app`.
- Root layout: The `src/app/_layout.tsx` file. It defines shared UI elements such as headers and tab bars so they are consistent between different routes.
- File name conventions: _Index_ file names, such as `index.tsx` file in the `src/app` directory matches `/` route.

### 3.7.2. Add a new screen to the stack

create a new file named `about.tsx` inside the `src/app` directory. It displays the screen name when the user navigates to the `/about` route.

```tsx
import { Text, View, StyleSheet } from "react-native"

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
})
```

Then, inside `src/app/_layout.tsx`:

1. Add a `<Stack.Screen />` component and an `options` prop to update the title of the `/about` route.
2. Update the `/index` route's title to `Home` by adding `options` prop.

`src/app/_layout.tsx`

```tsx
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
    </Stack>
  )
}
```

A stack navigator is the foundation for navigating between different screens in an app. On Android, a stacked route animates on top of the current screen. On iOS, a stacked route animates from the right.

### 3.7.3. Navigate between screens

We'll use Expo Router's `Link` component to navigate from the `/index` route to the `/about` route.

`src/app/index.tsx`

```tsx
import { Text, View, StyleSheet } from "react-native"
import { Link } from "expo-router"

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  // ...
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
})
```

Take a look at the changes in our app. Click on Link to navigate to the `/about` route:

### 3.7.4. Add a not-found route

When a route doesn't exist, we can use a `+not-found` route to display a custom fallback screen. Expo Router uses a special `+not-found.tsx` file to handle this case.

Create a new file named `+not-found.tsx` inside the `src/app` directory to add the `NotFoundScreen` component.
Add `options` prop from the `Stack.Screen` to display a custom screen title for this route.
Add a `Link` component to navigate to the `/` route.

`src/app/+not-found.tsx`

```tsx
import { Link, Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View style={styles.container}>
        <Link href={"/"} style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25292e",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
})
```

To test this, navigate to http://localhost:8081/123 URL in the web browser since it is easy to change the URL path there.

### 3.7.5. Add a bottom tab navigator

We'll add a bottom tab navigator to our app.

- Inside the `src/app` directory, add a `(tabs)` subdirectory. This special directory is used to group routes together and display them in a bottom tab bar.
- Create a `(tabs)/_layout.tsx` file inside the directory. It will be used to define the tab layout, which is separate from Root layout.
- Move the existing `index.tsx` and `about.tsx` files inside the `(tabs)` directory. The structure of `src/app` directory will look like this:

```
src/app
├── _layout.tsx
├── +not-found.tsx
└── (tabs)
    ├── _layout.tsx
    ├── index.tsx
    └── about.tsx
```

Update the Root layout file to add a `(tabs)` route:

`src/app/_layout.tsx`

```tsx
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
```

Inside `(tabs)/_layout.tsx`, add a `Tabs` component to define the bottom tab layout:

`src/app/(tabs)/_layout.tsx`

```tsx
import { Tabs } from "expo-router"

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  )
}
```

Let's take a look at our app now to see the new bottom tabs:

![alt text](doc_images/image03.png)

### 3.7.6. Install @expo/vector-icons

To install the `@expo/vector-icons` library, stop the development server by pressing `Ctrl + C` in the terminal, then run the following command:

```bash
npx expo install @expo/vector-icons
```

After the installation completes, start the development server again by running `npx expo start` or in case, `npx expo start --tunnel`.

### 3.7.7. Update bottom tab navigator appearance

Right now, the tab bar or header doesn't display a custom icon, and the bottom tab background color doesn't match the app's background color.

Modify the `src/app/(tabs)/_layout.tsx` file to add tab bar icons:

- Import `Ionicons` icons set from `@expo/vector-icons/Ionicons`.
- Add the `tabBarIcon` to both the `index` and `about` routes. This function takes `focused` and `color` as params and renders the icon component. From the icon set, we can provide custom icon names.
- Add `screenOptions.tabBarActiveTintColor` to the `Tabs` component and set its value to `#ffd33d`. This will change the color of the tab bar icon and label when active.

`src/app/(tabs)/_layout.tsx`

```tsx
import { Tabs } from "expo-router"
import Ionicons from "@expo/vector-icons/Ionicons" //new

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  )
}
```

Let's also change the background color of the tab bar and header using `screenOptions` prop:

`src/app/(tabs)/_layout.tsx`

```tsx
<Tabs
  screenOptions={{
    tabBarActiveTintColor: "#ffd33d",
    tabBarInactiveTintColor: "#fff8",
    tabBarStyle: {
      backgroundColor: "#25292e",
    },
    headerStyle: {
      backgroundColor: "#25292e",
    },
    headerShadowVisible: false,
    headerTintColor: "#fff",
  }}
>
```

Our app now has a custom bottom tabs navigator:

![alt text](doc_images/image04.png)
