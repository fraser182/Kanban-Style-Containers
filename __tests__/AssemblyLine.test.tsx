import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  within,
} from "@testing-library/react-native";
import { AssemblyLine } from "../src/components/AssemblyLine.component";


require("util").inspect.defaultOptions.depth = null;

afterEach(cleanup);
      
const getDeepTextContents = el => {
  if (!el) {
    return [];
  }
  else if (typeof el === "string") {
    return [el];
  }
  
  return el.children.flatMap(getDeepTextContents);
};

describe("AssemblyLine", () => {
  let debug;
  let queryByTestId;
  let queryAllByTestId;
  let getByTestId;
  let getAllByTestId;
  const stages = ["Idea", "Development", "Testing", "Deployment"];

  const addNewItem = item => {
    const input = getByTestId("new-item");
    fireEvent.changeText(input, item);
    fireEvent.press(getByTestId("add-new-item"));
  };
      
  const getStage = n => 
    getDeepTextContents(getAllByTestId("stage")[n])
      .filter(e => !stages.includes(e))
  ;
  
  const pressOn = (row, col, event="press") =>
    fireEvent(
      within(getAllByTestId("stage")[row])
        .getAllByTestId("item")[col],
      event
    )
  ;
  
  beforeEach(() => {
    ({
      debug,
      queryByTestId,
      queryAllByTestId,
      getAllByTestId,
      getByTestId,
    } = render(<AssemblyLine stages={stages} />));
  });
  
  describe("the correct elements were rendered", () => {
    it('should have an element with testID="new-item"', () => {
      expect(queryByTestId("new-item")).toBeTruthy();
    });
    
    it('should have an element with testID="add-new-item"', () => {
      expect(queryByTestId("add-new-item")).toBeTruthy();
    });
    
    it('should have 4 elements with testID="stage"', () => {
      expect(queryAllByTestId("stage")).toHaveLength(4);
    });
  });
  
  describe("adding assembly items", () => {
    describe('when "goldenrod" is typed into "add-item"', () => {
      let input;
      
      beforeEach(() => {
        input = getByTestId("new-item");
        fireEvent.changeText(input, "goldenrod");
      });
      
      it('should display entered text inside of "add-item"', () => {
        const {queryByDisplayValue} = within(input.parent);
        expect(queryByDisplayValue("goldenrod")).toBeTruthy();
      });
      
      describe('when pressed on "add-new-item"', () => {
        beforeEach(() => {
          fireEvent.press(getByTestId("add-new-item"));
        });
        
        it('should respond to item submission, ' + 
           'clearing the input on "new-item"', () => {
          const {queryByDisplayValue} = within(input.parent);
          expect(queryByDisplayValue("goldenrod")).not.toBeTruthy();
        });
        
        it('should have a single item in the first stage ' +
           'after adding with "add-new-item"', () => {
          expect(getStage(0)).toEqual(["goldenrod"]);
        });
      });
    });
  });
  
  describe('moving assembly items', () => {
    describe('with 4 items initially added to Idea stage', () => {
      const startItems = [
        "indigo",
        "turquoise",
        "magenta",
        "fuschia"
      ];
      
      beforeEach(() => startItems.forEach(addNewItem));
      
      it('items should initially be listed within Idea stage', () => {
        expect(getStage(0)).toHaveLength(4);
      });
      
      it('items should have been inserted in Idea stage in the correct order', () => {
        expect(getStage(0)).toEqual([...startItems].reverse());
      });
      
      describe('after first item in Idea stage is pressed', () => {
        beforeEach(() => pressOn(0, 0));
        
        it('should prepend first item to the Development stage', () => {
          expect(getStage(0)).toEqual(["magenta", "turquoise", "indigo"]);
          expect(getStage(1)).toEqual(["fuschia"]);
        });
        
        describe('after the last item in the Idea stage is pressed', () => {
          beforeEach(() => pressOn(0, 2));
          
          it('should prepend last item to the Development stage', () => {
            expect(getStage(0)).toEqual(["magenta", "turquoise"]);
            expect(getStage(1)).toEqual(["indigo", "fuschia"]);
          });
          
          describe('adding another item mid-stream', () => {
            beforeEach(() => addNewItem("maroon"));
            
            it('should prepend new item to the Idea stage', () => {
              expect(getStage(0)).toEqual(["maroon", "magenta", "turquoise"]);
              expect(getStage(1)).toEqual(["indigo", "fuschia"]);
            });
            
            describe('moving middle item from Idea to Development', () => {
              beforeEach(() => pressOn(0, 1));
             
              it('should have length 2 in Idea and 3 in Development', () => {
                expect(getStage(0)).toEqual(["maroon", "turquoise"]);
                expect(getStage(1)).toEqual(["magenta", "indigo", "fuschia"]);
              });
              
              describe('moving middle item from Development to Idea', () => {
                beforeEach(() => pressOn(1, 1, "onLongPress"));
                
                it('should have three in Idea and two in Development', () => {
                  expect(getStage(0)).toEqual(["maroon", "turquoise", "indigo"]);
                  expect(getStage(1)).toEqual(["magenta", "fuschia"]);
                });
                
                describe('moving items from Development to Testing', () => {
                  beforeEach(() => {
                    pressOn(1, 0);
                    pressOn(1, 0);
                  });
                 
                  it('should leave Development empty and Testing with two', () => {
                    expect(getStage(0)).toEqual(["maroon", "turquoise", "indigo"]);
                    expect(getStage(1)).toHaveLength(0);
                    expect(getStage(2)).toEqual(["fuschia", "magenta"]);
                  });
                  
                  describe('moving an item from Testing to Production', () => {
                    beforeEach(() => pressOn(2, 1));
                    
                    it('should leave one item in both Testing and Production', () => {
                      expect(getStage(0)).toEqual(["maroon", "turquoise", "indigo"]);
                      expect(getStage(1)).toHaveLength(0);
                      expect(getStage(2)).toEqual(["fuschia"]);
                      expect(getStage(3)).toEqual(["magenta"]);
                    });
                    
                    describe('moving an item backwards from Testing to Development', () => {
                      beforeEach(() => pressOn(2, 0, "onLongPress"));
                     
                      it('should leave one item in both Testing and Production', () => {
                        expect(getStage(0)).toEqual(["maroon", "turquoise", "indigo"]);
                        expect(getStage(1)).toEqual(["fuschia"]);
                        expect(getStage(2)).toHaveLength(0);
                        expect(getStage(3)).toEqual(["magenta"]);
                      });
                      
                      describe('clear the rest of the list out', () => {
                        beforeEach(() => {
                          pressOn(0, 2, "onLongPress");
                          pressOn(1, 0, "onLongPress");
                          pressOn(0, 1, "onLongPress");
                          pressOn(3, 0);
                          pressOn(0, 1, "onLongPress");
                          pressOn(0, 0, "onLongPress");
                        });
                       
                        it('should be empty', () => {
                          expect(getStage(0)).toHaveLength(0);
                          expect(getStage(1)).toHaveLength(0);
                          expect(getStage(2)).toHaveLength(0);
                          expect(getStage(3)).toHaveLength(0);
                        });
                      });
                    });
                   
                    describe('removing an item from Idea', () => {
                      beforeEach(() => pressOn(0, 1, "onLongPress"));
                     
                      it('should leave one item in Testing', () => {
                        expect(getStage(0)).toEqual(["maroon", "indigo"]);
                        expect(getStage(1)).toHaveLength(0);
                        expect(getStage(2)).toEqual(["fuschia"]);
                      });
                    });
                    
                    describe('removing an item from Production', () => {
                      beforeEach(() => pressOn(3, 0));
                     
                      it('should clear Production', () => {
                        expect(getStage(0)).toEqual(["maroon", "turquoise", "indigo"]);
                        expect(getStage(1)).toHaveLength(0);
                        expect(getStage(2)).toEqual(["fuschia"]);
                        expect(getStage(3)).toHaveLength(0);
                      });
                    });
                  });
                });
              });
            });
          });
        });
        
        describe('after the item within Development stage is contextually clicked', () => {
          beforeEach(() => pressOn(1, 0, "onLongPress"));
          
          it('should have moved that item back to the Idea stage', () => {
            expect(getStage(0)).toEqual(["magenta", "turquoise", "indigo", "fuschia"]);
            expect(getStage(1)).toHaveLength(0);
            expect(getStage(2)).toHaveLength(0);
            expect(getStage(3)).toHaveLength(0);
          });
        });
        
        describe('after the item within Development stage is clicked', () => {
          beforeEach(() => pressOn(1, 0));
          
          it('should have moved that item to the Testing stage', () => {
            expect(getStage(0)).toEqual(["magenta", "turquoise", "indigo"]);
            expect(getStage(1)).toHaveLength(0);
            expect(getStage(2)).toEqual(["fuschia"]);
          });
          
          describe('after the item within Testing stage is clicked', () => {
            beforeEach(() => pressOn(2, 0));
            
            it('should have moved that item to the Testing stage', () => {
              expect(getStage(0)).toEqual(["magenta", "turquoise", "indigo"]);
              expect(getStage(1)).toHaveLength(0);
              expect(getStage(2)).toHaveLength(0);
              expect(getStage(3)).toEqual(["fuschia"]);
            });
            
            describe('after the item within Deployment stage is clicked', () => {
              beforeEach(() => pressOn(3, 0));
              
              it('should have removed that item from the board', () => {
                expect(getStage(0)).toEqual(["magenta", "turquoise", "indigo"]);
                expect(getStage(1)).toHaveLength(0);
                expect(getStage(2)).toHaveLength(0);
                expect(getStage(3)).toHaveLength(0);
              });
            });
          });
        });
      });
    });
  });
});
