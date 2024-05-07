# Getting Started

Simple Board design which generates a Kanban board where the items between the containers are clickable. 

Click to move to the next container.
Long press to move to the previous container.




## Step 1: Install Packages and Pods

Download the file, extracting 

In the terminal on open the folder and type

```bash
npm install && cd ios &&  pod install && cd ../  
```
## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

*** 

### Areas To Improve

- Components
TextInput can be moved into it's own component
Add Item can be moved into it's own component
A custom button made from a Touchable would be better for styling.

- Map over the props and generate key and array accordingly.
This will allow less code changes for generating more / less / different data.

- Saving Data
Redux could be introduced to save the data,

- UI 
Needs completed worked properly. Display different for landscape or portrait

- Functionality
Drag and drop would suit the style

# Troubleshooting

Comments or suggwstions?  <fraser182@icloud.com>

