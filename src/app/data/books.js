import dawnOfTheDumbBack from "./assets/dawn-of-the-dumb-back.jpg"
import dawnOfTheDumbFront from "./assets/dawn-of-the-dumb-front.jpg"
import dawnOfTheDumbRoot from "./assets/dawn-of-the-dumb-root.jpg"
import ourSuperAdventureBack from "./assets/our-super-adventure-back.jpg"
import ourSuperAdventureFront from "./assets/our-super-adventure-front.jpg"
import ourSuperAdventureRoot from "./assets/our-super-adventure-root.jpg"
import theLuminariesBack from "./assets/the-luminaries-back.jpg"
import theLuminariesFront from "./assets/the-luminaries-front.jpg"
import theLuminariesRoot from "./assets/the-luminaries-root.jpg"

const books = {
  "dawn-of-the-dumb": {
    id: 1,
    title: "Dawn of the dumb",
    pictures: {back: dawnOfTheDumbBack, front: dawnOfTheDumbFront, root: dawnOfTheDumbRoot},
  },
  "our-super-adventure": {
    id: 2,
    title: "Out super adventure",
    pictures: {back: ourSuperAdventureBack, front: ourSuperAdventureFront, root: ourSuperAdventureRoot},
  },
  "the-luminaries": {
    id: 3,
    title: "The luminaries",
    pictures: {back: theLuminariesBack, front: theLuminariesFront, root: theLuminariesRoot},
  },
}

export default books
