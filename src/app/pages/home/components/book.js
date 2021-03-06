/* eslint-disable react/no-find-dom-node */
import React from "react"
import {pick} from "ramda"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import prefix from "inline-style-prefix-all"
import styles from "./book.css"
import theme from "../../../../theme"

function getBookSize({height, spineWidth}) {
  return {height, width: spineWidth}
}

function getBookDepth(opened) {
  if (opened) return {transform: `translateZ(${theme.OPENED_BOOK_TRANSLATE_Z}px)`}
  return prefix({transform: "translateZ(0px)"})
}

function getBookPosition(opened, bookSize, bookPosition, screen) {
  const xCoord = screen.width / 2 - bookSize.coverWidth / 2 - bookPosition.left
  const yCoord = screen.height / 2 - bookSize.height / 2 - bookPosition.top
  if (opened) return prefix({transform: `translateX(${xCoord}px) translateY(${yCoord}px)`})
  return {}
}

function getSpineStyle({spineWidth, height}) {
  return {height, width: spineWidth}
}

function getCoverStyle({coverWidth, height}) {
  const halfWidth = coverWidth / 2
  return prefix({
    height, width: coverWidth,
    transform: `rotateY(90deg) translate3d(${halfWidth}px, 0px, -${halfWidth}px)`,
  })
}

export default class Book extends React.Component {
  constructor(props) {
    super(props)
    this.state = {position: {}, screen: {}}
    this.openBook = this.openBook.bind(this)
    this.updateScreenResize = this.updateScreenResize.bind(this)
  }

  updateScreenResize() {
    const element = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({
      screen: {height: window.innerHeight, width: window.innerWidth},
      position: pick(["top", "left"], element),
    })
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({position: pick(["top", "left"], element)})
    this.updateScreenResize()
    window.addEventListener("resize", this.updateScreenResize)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenResize)
  }

  openBook() {
    this.props.openBook()
  }

  render() {
    const {pictures, size, open} = this.props
    const {position, screen} = this.state
    const bookWrapperClass = open ? styles.openedBook : styles.closedBook
    const bookPosition = getBookPosition(open, size, position, screen)
    const bookSize = getBookSize(size)

    return (
      <div style={bookSize} className={bookWrapperClass}>
        <div style={bookPosition} className={styles.book}>
          <div style={getBookDepth(open)} className={styles.depthOfBook}>
            <div className={styles.rotateBook}>
              <img
                onClick={() => this.openBook()}
                style={getSpineStyle(size)}
                className={styles.spine}
                src={pictures.root}
              />
              <img
                onClick={() => this.openBook()}
                style={getCoverStyle(size)}
                className={styles.frontCover}
                src={pictures.front}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Book.propTypes = {
  title: PropTypes.string.isRequired,
  pictures: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired,
  openBook: PropTypes.func.isRequired,
  open: PropTypes.bool,
}
