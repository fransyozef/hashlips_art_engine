const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");
const keccak256 = require('keccak256');

const {
  baseUri,
  description,
  namePrefix,
  network,
  solanaMetadata,
  useRandomFilenames,
  maskMetadataJsonFilename,
  seedPhrase,
} = require(`${basePath}/src/config.js`);

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  const filename = useRandomFilenames ? `${item.edition}_${item.dna}` : item.edition;
  if (network == NETWORK.sol) {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.creators = solanaMetadata.creators;
  } else {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `${baseUri}/${filename}.png`;
  }
  const seed = `${item.edition}${seedPhrase}`;
  const hexFilename = keccak256(seed).toString('hex');
  const filenameMetadata = maskMetadataJsonFilename ? `${item.edition}_0x${hexFilename.toUpperCase()}` : item.edition;
  fs.writeFileSync(
    `${basePath}/build/json/${filenameMetadata}.json`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);

if (network == NETWORK.sol) {
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  console.log(
    `Updated creators for images to ===> ${JSON.stringify(
      solanaMetadata.creators
    )}`
  );
} else {
  console.log(`Updated baseUri for images to ===> ${baseUri}`);
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
}
