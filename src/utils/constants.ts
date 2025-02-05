import { backgroundWhat } from "../assets";
import { gifGuy } from "../assets";
import { zkpBackground } from "../assets";
import { introBkg } from "../assets";
import {shieldedTree} from "../assets"
import {shieldedBkg} from "../assets"

export const RESCAN_INTERVAL = 20000;
export const seedWallet = 'scrap divert visual news able sudden coyote network unknown budget film flock record burden viable write know utility purity fly excite later planet suggest'
export const MAINNET_LIGHTWALLETD_PROXY = "https://zcash-mainnet.chainsafe.dev";

export const educationalData = [
  {
    id: 0,
    title: "Welcome",
    data: [
      {
        img: "./main/welcome.png",
        bkg: "./assets/page2/What_is_Zcash_background.webp",
        content: `Welcome`,
      },
    ],
  },
  {
    id: 1,
    title: "What is Zcash?",
    data: [
      {
        img: gifGuy,
        bkg: backgroundWhat,
        content: `Zcash is a digital currency that gives individuals greater control over their financial transactions. It aims to promote economic freedom by offering a secure and private way to exchange value without intermediaries.
`,
      },
    ],
  },
  {
    id: 2,
    title: "Introduction",
    data: [
      {
        img: gifGuy,
        bkg: introBkg,
        content: `What makes Zcash unique is its use of advanced privacy technology that encrypts transaction details, such as the amounts and addresses. This feature allows users to keep their assets and transaction information private, offering an extra layer of security compared to other cryptocurrencies.`,
      },
    ],
  },
  {
    id: 3,
    title: "Zero Knowledge Proofs",
    data: [
      {
        img: gifGuy,
        bkg: zkpBackground,
        content: `A zero-knowledge proof is a cryptographic method that allows one party (the prover) to convince another party (the verifier) that a statement is true without revealing any information about the statement itself.`,
      },
    ],
  },
  {
    id: 4,
    title: "Shielded Pools",
    data: [
      {
        img: shieldedTree,
        bkg: shieldedBkg,
        content: `Orchard pool: The latest and most secure shielded pool, launched in 2022. It does not rely on Trusted Setup.

Sapling pool: A legacy shielded pool that is still supported but relies on Trusted Setup security assumption.

Transparent pool: This is similar to BItcoin. All transaction within the transparent pool have amounts and addresses shown.

Sprout pool: The first ever shielded pool created. It is no longer in use.
`,
      },
    ],
  },
  {
    id: 5,
    title: "Ecosystem",
    data: [
      {
        img: "/DAOlogo.png",
        bkg: "./assets/page2/What_is_Zcash_background.webp",
        content: `Sideshift AI`,
      },
    ],
  },
  {
    id: 6,
    title: "Payments",
    data: [
      {
        img: "/DAOlogo.png",
        bkg: "./assets/page2/What_is_Zcash_background.webp",
        content: `Sideshift AI`,
      },
    ],
  },
  {
    id: 7,
    title: "Create a Wallet",
    data: [
      {
        img: "/DAOlogo.png",
        bkg: "./assets/page2/What_is_Zcash_background.webp",
        content: `Sideshift AI`,
      },
    ],
  },
  {
    id: 8,
    title: "Wallet Address",
    data: [
      {
        img: "/DAOlogo.png",
        bkg: "./assets/page2/What_is_Zcash_background.webp",
        content: `Sideshift AI`,
      },
    ],
  },
  {
    id: 9,
    title: "Memo Testing",
    data: [
      {
        img: "/DAOlogo.png",
        bkg: "./assets/page2/What_is_Zcash_background.webp",
        content: `Sideshift AI`,
      },
    ],
  },
  {
    id: 10,
    title: "Explore more about Zcash",
    data: [
      {
        img: "/DAOlogo.png",
        bkg: "./assets/page2/What_is_Zcash_background.webp",
        content: `Sideshift AI`,
      },
    ],
  },
  
];
