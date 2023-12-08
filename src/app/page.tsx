'use client';
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import Button from './components/button/Button';


const db = [
  {
    name: 'Richard Hendricks',
    url: './img/ampoule-dd.jpeg'
  },
  {
    name: 'Erlich Bachman',
    url: './img/ampoule-dd.jpeg'
  },
  {
    name: 'Monica Hall',
    url: './img/ampoule-dd.jpeg'
  },
  {
    name: 'Jared Dunn',
    url: './img/ampoule-dd.jpeg'
  },
  {
    name: 'Dinesh Chugtai',
    url: './img/ampoule-dd.jpeg'
  }
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
          <TinderCard className='swipe' preventSwipe={['up', 'down']} key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
            {/* <div className="buttonsRow">
              <Button type="no" onClickFunction={(dir: string) => swiped(dir = "left", character.name)} />
              <Button type="yes" onClickFunction={(dir: string) => swiped(dir = "right", character.name)} />
            </div> */}
          </TinderCard>
        )}


      </div>
      {answer ? <h2 className='infoText'>You answered {answer}</h2> : <h2 className='infoText' />}
    </div>
  )
}
