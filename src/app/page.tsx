'use client';
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    question: 'Will the eath be destroyed by 2050?',
    leftAnswer: 'No',
    rightAnswer: 'Yes',
    url: './img/ampoule-dd.jpeg'
  },
]

export default function Home() {

  const characters = db
  const [lastDirection, setLastDirection] = useState<string>()

  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete)
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
        </div>
      </TinderCard>
    )}
  </div>
  {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
</div>
)
}
