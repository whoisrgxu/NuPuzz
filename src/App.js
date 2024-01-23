  import React from 'react';
  import './App.css';
  import {useState} from 'react';
  import {useMemo} from 'react';

  function App() {
    // function to generate a random number array ranging from 1 to 15
    // and leave one eleent with null value
    function generateRandom () {

        let array = [];
        
        let temp = Math.floor(Math.random() * 15) + 1;
        let emptyIdx = Math.floor(Math.random() * 16);
        
        let i;
        let j = 0;
        while (j < 16) {
            for (i = 0; i < array.length; i++) {

                if (temp === array[i]) break;
            }

            if (i === array.length) {

                if (j !== emptyIdx) {
                    array[j] = temp;
                }
                else {
                    array[j] = null;
                    j++;
                    array[j] = temp;
                }
                j++;
                
            }
            temp = Math.floor(Math.random() * 15) + 1;
        } 

    return {array, emptyIdx};
    } 
    // function to check if puzzle is solved
    function checkSolved(array) {
        
        let num = 1;
        while(num <= array.length-1) {
            if (array[num-1] !== num) return false;
            num++;
        }
        return true;
    }

    const {array, emptyIdx} = useMemo(() => {return generateRandom();}, []);

    const [newArray, setArray] = useState(array);
    const [newEmptyIdx, setEmpty] = useState(emptyIdx);

    function handleClick(num, index) {

        if (index - 4 === newEmptyIdx || index + 4 === newEmptyIdx || (index + 1 === newEmptyIdx && (index + 1) % 4 !== 0) || (index - 1 === newEmptyIdx && index % 4 !== 0)) {
            document.querySelector("audio").play();
            const updatedArray = [...newArray];
            updatedArray[newEmptyIdx] = updatedArray[index];
            updatedArray[index] = null;
            setArray(updatedArray);
            setEmpty(index);
            
            if (checkSolved(updatedArray)) {
                setTimeout(() => {
                    alert('Good Job! You solved the puzzle!');
                }, 200);
            }
        }       
    }   
    function handleButtonClick(e) {
        
        window.location.reload();
    }

    // Include the array of cells inside numBox
    return (
        <div>
            <div class="btn-div"><button className="button" onClick={handleButtonClick}>Restart</button></div>
            <div id="board">
                <div className="numBox">
                    {newArray.map((num, index) => (
                        <div key={index} className="cell" onClick={() => {
                            handleClick(num, index);
                        }}>
                            {num}
                        </div>
                    ))}
                </div>
            </div>     
        </div>
    )    
  }

  export default App;
