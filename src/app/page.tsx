'use client';
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import Button from './components/button/Button';


const db = [
  {
    question: 'Will the eath be destroyed by 2050?',
    leftAnswer: 'No',
    rightAnswer: 'Yes',
    url: './img/ampoule-dd.jpeg'
  },
]

export default function Home() {
  //Everything commented with * is a TTS line
  //*const synth = window.speechSynthesis;
  const characters = db
  const [lastDirection, setLastDirection] = useState<string>()
  let [answer, setAnswer] = useState<string>()


  function onCardAnswered(direction: string, nameToDelete: string) {
    swiped(direction, nameToDelete)
    setTimeout(() => {
      console.log('Waiting');
    }, 500);

    () => outOfFrame(nameToDelete)

  }

  function swiped(direction: string, nameToDelete: string) {

    if (direction == "left") {
      setAnswer("No")
    } else {
      setAnswer("Yes")
    }
    /* *let swipeText = new SpeechSynthesisUtterance(
      "You answered "+answer,
    );
    synth.speak(swipeText);*/


    setLastDirection(direction)
  }

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!')
  }

return (
  <div>
  <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
  <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
  <h1>Eco Bacchus</h1>
  <div className='cardContainer'>
    {characters.map((character) =>
      <TinderCard className='swipe' key={character.question} onSwipe={(dir) => swiped(dir, character.question)} onCardLeftScreen={() => outOfFrame(character.question)}>
        <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
          <div className='veil'>
            <div className='answers'>
              <div className='answer'>
                <h4>{character.leftAnswer}</h4>
              </div>
              <div className='answer'>
                <h4>{character.rightAnswer}</h4>
              </div>
            </div>
            <h3>{character.question}</h3>
          </div>
          {/* <div className="buttonsRow">
              <Button type="no" onClickFunction={(dir: string) => swiped(dir = "left", character.name)} />
              <Button type="yes" onClickFunction={(dir: string) => swiped(dir = "right", character.name)} />
            </div> */}
        </div>
      </TinderCard>
    )}
  </div>
  {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
</div>
)
}
