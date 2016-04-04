import { expect } from "chai";
import { fromJS } from "immutable";
import reducer from "../../src/councilmeeting/councilmeeting.reducer";
import { COUNCILMEETING_SAVE_ONE_SUCCESS } from "../../src/councilmeeting/councilmeeting.actions";

describe("councilmeeting reducer", () => {
  it("should return the initial state", () => {
    expect(
      reducer(undefined, {})
      ).to.equal(fromJS({
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
      }));
  });
    it("should handle COUNCILMEETING_SAVE_ONE_SUCCESS", () => {
      expect(
        reducer([], {
          type: COUNCILMEETING_SAVE_ONE_SUCCESS,
          date: "date1"
        })
        ).toEqual([
        {
          id: 2,
          date: "date1",
        }
        ])

   /* expect(
      reducer(
        [
          {
            text: "Use Redux",
            completed: false,
            id: 0
          }
        ],
        {
          type: types.ADD_TODO,
          text: 'Run the tests'
        }
      )
    ).toEqual(
      [
        {
          text: "Run the tests",
          completed: false,
          id: 1
        },
        {
          text: "Use Redux",
          completed: false,
          id: 0
        }
      ]
      )*/
    })
  })
