'use client';
import TinderCard from 'react-tinder-card'



export default function Home() {

const onSwipe = (direction: string) => {
  console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier: string) => {
  console.log(myIdentifier + ' left the screen')
}

return (
  <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
)
}
