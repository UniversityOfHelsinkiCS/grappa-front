import expect from 'chai'
import * as actions from '../../src/councilmeeting/Councilmeeting.actions'
//import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to add a councilmeeting', () => {
    const date = '22.22.22.21010'
    const expectedAction = {
      type: types.ADD_TODO,
      text
    }
    expect(actions.addCouncilmeeting(text)).toEqual(expectedAction)
  })
})
