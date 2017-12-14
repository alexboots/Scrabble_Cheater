import React, { Component } from 'react'
import classNames from 'classnames'

import { Menu, Label, Button } from 'semantic-ui-react'

class WordList extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      wordHoveredKey: null
    }
  }

  getCoordinatesToHighlight = (wordInfo)  => {
    const startOfWord = wordInfo[1][0]
    const endOfWord   = wordInfo[1][1]
    const wordArray = wordInfo[2]

    const horizontal = startOfWord[0] === endOfWord[0]

    let coordinates = []
    if(horizontal) {
      const wordLength =  endOfWord[1] - startOfWord[1]
      const y = startOfWord[0]
      let xCoordinate = startOfWord[1]

      for (let i = 0; i <= wordLength; i++) {
        coordinates.push({
          x: xCoordinate++, 
          y: y,
          char: wordArray[i]
        })
      }
    } else {
      const wordLength = endOfWord[0] - startOfWord[0]
      const x = startOfWord[1]
      let yCoordinate = startOfWord[0]

      for (let i = 0; i <= wordLength; i++) {
        coordinates.push({
          x: x, 
          y: yCoordinate++,
          char: wordArray[i]
        })
      }
    }

    return coordinates
  }

  handleWordOver = (wordInfo, i) => {
    // y x coordinates 
    const coordinatesToHighlight = this.getCoordinatesToHighlight(wordInfo)

    let wordHoveredKey = i

    // need to pass this up on props
    this.props.handleHighlightWordOnHover(coordinatesToHighlight, wordHoveredKey)
  }

  handleWordOut = () => {
    this.props.handleHighlightWordOnHover([], null)
  }

  handleAddWordToTable = (wordInfo, i) => {
    this.props.addWordToTable(wordInfo, i)
    this.handleWordOut() // un-highlight word added
  }


  buildList = () => {
    const wordList = []
    this.props.words.forEach((wordInfo, i) => {
      const word = wordInfo[0]
      const points = wordInfo[3]

      wordList.push(
        <Menu.Item
          className={ classNames({ 'active': this.props.wordHoveredKey === i}) }
          key={ i }
          onMouseEnter={ this.handleWordOver.bind(this, wordInfo, i) }
          onMouseDown={ this.handleWordOver.bind(this, wordInfo, i) }
        >
          {`${ word } is worth ${points} points`}
           <Label 
            onClick={ this.handleAddWordToTable.bind(this, wordInfo, i) }
            onMouseEnter={ this.handleWordOver.bind(this, wordInfo, i) } /* todo: this is lazy and expensive: fix */
          >
              <i 
                className="fa fa-plus-circle" 
                aria-hidden="true"
                onMouseEnter={ this.handleWordOver.bind(this, wordInfo, i) } /* todo: this is lazy and expensive: fix */
              ></i>
           </Label>
        </Menu.Item>
      )
    })

    return wordList
  }

  render() {
    if(!this.props.words) {
      return null
    }
    return(
      <Menu 
        vertical 
        className="scrollable"
        onMouseOut={ this.handleWordOut }
      >
        { this.props.words && this.props.words.length === 0 ? // this doesn't seem right
          (
            <Menu.Item>
              No possible words with this rack
            </Menu.Item>
          ) : null
        }
        { this.buildList() }
      </Menu>
    )
  }
}

export default WordList