import { 
  RECEIVED_SUGGESTED_WORDS,
  SENT_TABLE_DATA
} from '../constants/actions'


import { showSuggestedWords } from './rackWordlist'

// Send
const sentTableData = () => ({
  type: SENT_TABLE_DATA
})

export const submitTableData = (socket) => {
  return (dispatch, getState) => {
    dispatch(showSuggestedWords())
    dispatch(sentTableData({ loading: true }))
    const tableData = {
      gameType: getState().gameType.gameType,
      board: getState().board.present.tiles,
      rack: getState().rack.present.letters
    }

    // Note: component socketIoHOC will receive the data and trigger receiveTableData
    socket.emit('analyze_board', JSON.stringify(tableData))
  }
}

// Receive 
export const receivedTableData = (suggestedWords) => ({
  type: RECEIVED_SUGGESTED_WORDS,
  suggestedWords
})
