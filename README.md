# Welcome!

NOTE!!! This is a FORKED version of the HashLip Art Generation. The original one is at https://github.com/HashLips/hashlips_art_engine.

As reference I used HashLips Youtube Video : https://www.youtube.com/watch?v=Zhmj4PiJ-GA


# Support

Like this fork of the HashLip Art Generation? Want to support me? Please donate some crypto to me (so I can support my 4 wives and 11 kids and 3 dogs) 

** ETH : 0xb0e73af58a9fdece76ba74a0cfb09265ae7e45d0

** Polygon : 0x70a0D3c75853f706B17970727A25113a63bCAf1f


# Let's start

## NodeJS
You need NodeJS to run the generator and it's tools. Recommended version is NodeJS 14. 
Download it at https://nodejs.org/en/download/

## Installation

If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

```sh
git clone https://github.com/HashLips/hashlips_art_engine.git
```

Then install the required packages: 

```sh
npm install
```

## Setting up your layers folder structure

There is a folder `/layers/`. In that folder you can put your layers, but adding subfolders. 
So for example, if you have a layer called `Backgrounds` , then create the folder `/layers/Backgrounds/`. 
You then put your png files in that folder.


## The Config file

Now that you have setup your layers folder strucute, you can use it in the application.
You need to define each layer in the `/src/config.js` file in the `layerConfigurations` section :

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Backgrounds" },
    ],
  },
];
```
Notice that the `name` value ("Backgrounds") is the same as your folder name in `/layers/` where you stored you png files. The application will take the name and will look for your images in the folder with the EXACT name. 

So in this example, the engine will look in `/layers/Backgrounds/` folder for your images.

If that folder doesn't exists, the enginee WILL CRASH!!

So if you have 

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Backgroundss" },
    ],
  },
];
```
But your folder name is called `/layers/Backgrounds` , then the application WILL CRASH!!!!


## Stacking your layers

The application will take your png files and stack them on eachother to create 1 png file.

You need to define the layers order in the `config.js` file. For example :

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background"},
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
  },
];
```

So the `layersOrder` will define the layers and the order that the layers are stacked on.
Keep in mind, you define the layer "reversed". So in this example , the layer `Background` is the bottom layer (although you define it as first), and everything will be stack on top of it and the layer `Top lid` would be then the last to be add on top of the stack.


## Ammount of exported files

You define the ammount of exported files also  in the `layerConfigurations`. Use the `growEditionSizeTo` for this.


## Generate your files

You are set with the minimum configuration to generate your collection. 
Just run the command

```sh
npm start
```

Your collection will be exported in the folder `/build/`. The images will be exported in `/build/images/` and the metadata will be generated in `/build/json/`


## Update the actual png file location

In the HashLips Masterclass video, you will see that the images are uploaded to IPFS. This will create a unique CID link.
You need to update your json files with the new CID link. 

Goto your `config.js` file and find `const baseUri = "ipfs://NewUriToReplace";`. Change the NewUriReplace with the new CID link, for example

```js
const baseUri = "ipfs://Ame3Kd9Az";`
```

You could also upload the images to your own hosting server and use your domainname, for example

```js
const baseUri = "https://mydomain.com";`
```

Now run the the command


```sh
npm run update_info
```

You will see that the json files will be updated with the new `baseUri`.

Now you can upload your metadata to IPFS.


## Setting up rarity

You can setup a rarity per layer to define which image is rare in that layer. 
Lets say you have a folder structure `/layers/Background/` and in that folder you have 2 images :

```
- background1.png
- background2.png
```

At this moment, the generator will take one of these 2 png's as input, because they are on the same weight.
To make a rare background, you need to rename the files with a `#` in it and a number. For example

```
- background1#50.png
- background2#1.png
```

The lower the number, the more rare. So in this example, `background1` would be picked more by the generator than `background2`.


# Extra options

Here are some extra options you can use to finetune your collection.

## Use different attribute name

At default, the generator will take the `name` attribute value as `trait_type` value.

For example

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background"},
    ],
  },
];
```
will generate an attribute like

```
    {
      "trait_type": "Background",
      "value": "Some value"
    },
```

But you can use a different display name, for example :

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background" , options: { displayName: 'My Background" } },
    ],
  },
];
```

will produce the attribute

```
    {
      "trait_type": "My Background",
      "value": "Some value"
    },
```

## Ignore layer as DNA uniqueness

The generator will create a DNA based on your layers and rarity etc. This DNA should be unique in your collection.
There could be reason you don't want a certain layer to be included in the DNA generation, because that layer is maybe not that import to be unique. For example

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background" , options: { bypassDNA: true } },
    ],
  },
];
```

## Remove layer as attribute
If you need to remove layer as attribute, you can use the `skipAttribute` option. For example

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Head" , options : { skipAttribute : true } },
    ],
  },
];
```
The layer `Head` will not be included as attribute in the json file.

## Offset numbering of the files
At default, the numbering of the files will begin at 1 up to the `growEditionSizeTo` you have set.
In some cases, you want to start at a different offset.
You can use the `offsetIndex` for that in the `config.js` file. Default is set to 0.
Note! When the generation starts at 0, so if you put in 10, the numbering will start at 11.

## Hashed png filenames
At default, the png output file start with a number up to the `growEditionSizeTo` you have set. So for example 1.png, 2.png etc etc.

This structure makes it easy target for snipers/webcrawlers to download all you files you have uploaded to a server (pinata/ipfs or your own server). To make it a little bit harder, there is the `useRandomFilenames` option in the `config.js` file. When you set this to `true` , then the filename will be same as the DN. For example sd3lkjdfg93.png

## Hashed metadata json

With `useRandomFilenames` you can hash your png filenames. You can also do this with the metadata json.

It comes with 3 parts

1) set `maskMetadataJsonFilename` to `true` in config.js
2) set `seedPhrase` to a random phrase. You could use https://www.random.org/strings/ to generate some random string
3) The smart contract also needs this seedPhrase. I (fransyozef) made a modified version of HashLips smart contract at https://github.com/fransyozef/nft-erc721-collection. Enter you seedPhrase in the config file : https://github.com/fransyozef/nft-erc721-collection/blob/main/smart-contract/config/CollectionConfig.ts#L36 before you deploy your contract


Your metadata file will look something like this : `1_0x3B3D7CA6F14898CDAC93A5ABDB3680CBAD7192676AF76001EDD3BA65481003C3.json`. Make sure on the contract side, that the metadata url has the same json filename. 


## Empty filename
If you have a png file name `empty.png` or with rarity for example `empty#50.png` , then this will not be included in the attributes. So this will prevent something like this


```
  "attributes": [
    {
      "trait_type": "Eyeball",
      "value": "empty"
    },
  ]
```
In this case the whole `Eyeball` trait will then not be generated :

```
  "attributes": [
  ]
```

## Add a text counter

You can add a textcounter on top of your exported images.

In the `config.js` set the const `addTextCounter` to true.

for example :

```js
const addTextCounter = true;
```

Now you can configure the text with the `textCounterConfig` object :

```js
const textCounterConfig = {
  x: 0,
  y: 0,
  fontSize : 20,
  template: 'I am number #[edition]',
  color: "#ffffff",
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
}
```


## Output Format
Set your output format

```js
const format = {
  width: 512,
  height: 512,
  smoothing: false,
};
```

Update your `format` size, ie the outputted image size, and the `growEditionSizeTo` on each `layerConfigurations` object, which is the amount of variation outputted.


### Debug logs
If you want to have logs to debug and see what is happening when you generate images you can set the variable `debugLogs` in the `config.js` file to true. It is false by default, so you will only see general logs.

### Mix configuration
You can mix up the `layerConfigurations` order on how the images are saved by setting the variable `shuffleLayerConfigurations` in the `config.js` file to true. It is false by default and will save all images in numerical order.

If you want to play around with different blending modes, you can add a `blend: MODE.colorBurn` field to the layersOrder `options` object.

If you need a layers to have a different opacity then you can add the `opacity: 0.7` field to the layersOrder `options` object as well.

Here is an example on how you can play around with both filter fields:

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background" , {
        options: {
          bypassDNA: false;
        }
      }},
      { name: "Eyeball" },
      {
        name: "Eye color",
        options: {
          blend: MODE.destinationIn,
          opacity: 0.2,
          displayName: "Awesome Eye Color",
        },
      },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid", options: { blend: MODE.overlay, opacity: 0.7 } },
      { name: "Top lid" },
    ],
  },
];
```

### Blending modes
Here is a list of the different blending modes that you can optionally use.

```js
const MODE = {
  sourceOver: "source-over",
  sourceIn: "source-in",
  sourceOut: "source-out",
  sourceAtop: "source-out",
  destinationOver: "destination-over",
  destinationIn: "destination-in",
  destinationOut: "destination-out",
  destinationAtop: "destination-atop",
  lighter: "lighter",
  copy: "copy",
  xor: "xor",
  multiply: "multiply",
  screen: "screen",
  overlay: "overlay",
  darken: "darken",
  lighten: "lighten",
  colorDodge: "color-dodge",
  colorBurn: "color-burn",
  hardLight: "hard-light",
  softLight: "soft-light",
  difference: "difference",
  exclusion: "exclusion",
  hue: "hue",
  saturation: "saturation",
  color: "color",
  luminosity: "luminosity",
};
```


## Extra metadata
You can also add extra metadata to each metadata file by adding your extra items, (key: value) pairs to the `extraMetadata` object variable in the `config.js` file.

```js
const extraMetadata = {
  creator: "Fransjo Leihitu",
};
```

If you don't need extra metadata, simply leave the object empty. It is empty by default.

```js
const extraMetadata = {};
```

That's it, you're done.

## Utils

### Updating baseUri for IPFS and description

You might possibly want to update the baseUri and description after you have ran your collection. To update the baseUri and description simply run:

```sh
npm run update_info
```

### Generate a preview image

Create a preview image collage of your collection, run:

```sh
npm run preview
```

### Generate pixelated images from collection

In order to convert images into pixelated images you would need a list of images that you want to convert. So run the generator first.

Then simply run this command:

```sh
npm run pixelate
```

All your images will be outputted in the `/build/pixel_images` directory.
If you want to change the ratio of the pixelation then you can update the ratio property on the `pixelFormat` object in the `src/config.js` file. The lower the number on the left, the more pixelated the image will be.

```js
const pixelFormat = {
  ratio: 5 / 128,
};
```

### Generate GIF images from collection

In order to export gifs based on the layers created, you just need to set the export on the `gif` object in the `src/config.js` file to `true`. You can also play around with the `repeat`, `quality` and the `delay` of the exported gif.

Setting the `repeat: -1` will produce a one time render and `repeat: 0` will loop forever.

```js
const gif = {
  export: true,
  repeat: 0,
  quality: 100,
  delay: 500,
};
```


### Hidden image and json template

In the folder `_hidden` you will find the template for the hidden image and json. You can use this for the prereveal of your collection

Hope you create some awesome artworks with this code
