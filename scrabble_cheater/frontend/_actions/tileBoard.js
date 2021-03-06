import { 
  MAKE_TILE_EDITABLE, 
  TOGGLE_GAME_TYPE,
  SET_MOVE_DIRECTION,
  CHANGE_COORDINATE_VALUE,
  CLEAR_BOARD
} from '../constants/actions'

export const clearBoard = () => {
  return { type: CLEAR_BOARD }
}

export const toggleGameType = () => {
  return { type: TOGGLE_GAME_TYPE }
}

export const setMoveDirection = (direction) => ({
  type: SET_MOVE_DIRECTION,
  direction
})

const changeCoordinateValue = (coordinates, value) => {
  return {
    type: CHANGE_COORDINATE_VALUE,
    value,
    coordinates
  }
}

const makeTileEditable = (coordinates) => ({
  type: MAKE_TILE_EDITABLE,
  coordinates
})

// Thunks
export const changeValueMoveToNextTile = (coordinates, value) => {
  return (dispatch, getState) => {
    const direction = getState().tile.present.direction

    let newEditCoordinates
    if(direction === 'right') {
      newEditCoordinates = { ...coordinates, x: coordinates.x + 1 }
    } else if (direction === 'down') {
      newEditCoordinates = { ...coordinates, y: coordinates.y + 1 }
    } 

    dispatch(changeCoordinateValue(coordinates, value))
    dispatch(makeTileEditable(newEditCoordinates))
  }
}

export const resetDirectionAndMakeTileEditable = (coordinates) => {
  return (dispatch, getState) => {
    let { x, y } = coordinates
    const currentBoard = getState().board.present.tiles

    // For clicks on new tiles, reset direction to null
    dispatch(setMoveDirection(null))
    dispatch(makeTileEditable(coordinates))
  }
}
