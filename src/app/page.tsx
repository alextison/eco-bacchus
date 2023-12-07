'use client';
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'

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
      <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
        <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
          <h3>{character.name}</h3>
        </div>
      </TinderCard>
    )}
  </div>
  {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
</div>
)
}
