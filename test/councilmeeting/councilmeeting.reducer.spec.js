import { expect } from "chai";
import { fromJS } from "immutable";
import reducer from "../../src/councilmeeting/Councilmeeting.reducer";
import {
  COUNCILMEETING_SAVE_ONE_SUCCESS,
  COUNCILMEETING_GET_ALL_SUCCESS,
  // COUNCILMEETING_GET_ALL_FAILURE,
}
from "../../src/councilmeeting/Councilmeeting.actions";


const initialState = fromJS({
  councilmeetinglist: [
    {
      id: 1,
      date: "date1",
    },
    {
      id: 2,
      date: "date2",
    },
    {
      id: 3,
      date: "date3",
    },
  ],
});

describe("councilmeeting reducer", () => {
  it("should return the initial state", () => {
    expect(
      reducer(undefined, {})
      ).to.equal(initialState);
  });


  it("should change meetinglist when receiving dates", () => {
    const mockDatesFromAPI = [
      {
        id: 1,
        date: "date1",
      },
      {
        id: 2,
        date: "date2",
      },
      {
        id: 3,
        date: "date3",
      },
    ];
    const expectedState = initialState.updateIn(["councilmeetinglist"],
      list => list.concat(fromJS(mockDatesFromAPI))
      );
    const newState = reducer(initialState, {
      type: COUNCILMEETING_GET_ALL_SUCCESS,
      payload: mockDatesFromAPI,
    });
    expect(newState).to.equal(expectedState);
  });

  it("should add dates to the state", () => {
    const newDate = [{
      id: 4,
      date: "date4",
    }];
    const expectedState = fromJS({
      councilmeetinglist: [
        {
          id: 1,
          date: "date1",
        },
        {
          id: 2,
          date: "date2",
        },
        {
          id: 3,
          date: "date3",
        },
        {
          id: 4,
          date: "date4",
        },
      ],
    });
    expect(reducer(initialState, {
      type: COUNCILMEETING_SAVE_ONE_SUCCESS,
      payload: newDate,
    })).to.equal(expectedState);
  });
});
