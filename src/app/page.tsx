'use client';
import React, { use, useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import Button from './components/button/Button';
import Swal from 'sweetalert2';


const db = [
  {
    question: 'Le réchauffement climatique est-il mesuré par une augmentation de la température mondiale moyenne ?',
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Oui",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: 'Les émissions de CO2 sont-elles le seul facteur responsable du changement climatique ?',
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Non",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: 'Les combustibles fossiles contribuent-ils aux émissions de gaz à effet de serre ?',
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Oui",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: 'Les océans absorbent-ils une quantité marginale de dioxyde de carbone émis par les activités humaines ? ',
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Non",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: 'Les forêts tropicales sont-elles des puits de carbone importants pour réguler le climat mondial ?  ',
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Oui",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: 'Les pesticides peuvent-ils avoir un impact négatif sur la biodiversité ? ',
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Oui",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: 'Les déchets plastiques peuvent-ils nuire à la vie marine ?',
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Oui",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: 'Les pratiques de recyclage actuelles sont-elles suffisantes pour résoudre le problème croissant des déchets ?',
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Non",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: "L'érosion du sol peut-elle être accentuée par la déforestation ? ",
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Non",
    url: './img/ampoule-dd.jpeg'
  },
  {
    question: "Les marées noires ont-elles des effets néfastes sur les écosystèmes côtiers ?",
    leftAnswer: 'Non',
    rightAnswer: 'Oui',
    response: "Oui",
    url: './img/ampoule-dd.jpeg'
  },
]

export default function Home() {
  //Everything commented with * is a TTS line
  //*const synth = window.speechSynthesis;
  const characters = db;
  const [lastDirection, setLastDirection] = useState<string>();
  let [answer, setAnswer] = useState<string>();
  let [questionIndex, setQuestionIndex] = useState<number>(9);

  function showAlert(wasRight: boolean) {
    if(wasRight){
      Swal.fire({
        title: "Bravo",
        text: "C'était la bonne réponse",
        icon: "success",
        confirmButtonText: "OK",
      });
    }else{
      Swal.fire({
        title: "Dommage",
        text: "C'était la mauvaise réponse",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    
  }

  const swipe = async (direction: string) => {
    if (questionIndex >=0 && questionIndex < db.length) {
      // Didn't find a way to retrieve the right TinderCard thanks to it's key
      // await db[questionIndex].question.current.swipe(direction);
      buttonActions(direction);
    }
  }

  function buttonActions(direction: string) {
    swiped(direction, characters[questionIndex].question);
    () => outOfFrame(characters[questionIndex].question);

  }

  const swiped = (direction: string, cardKey: string) => {
    /* *let swipeText = new SpeechSynthesisUtterance(
      "You answered "+answer,
    );
    synth.speak(swipeText);*/
    let newAnswer = direction === 'left' ? 'Non' : 'Oui';
    setAnswer(newAnswer);
    answer = newAnswer
    if (answer === characters[questionIndex].response) {
      showAlert(true);
    } else {
      showAlert(false);
    }
    setLastDirection(direction);
    setQuestionIndex((prevIndex) => prevIndex - 1);
  };

  /*useEffect(() => {
    if (answer === characters[questionIndex].response) {
      showAlert(true);
    } else {
      showAlert(false);
    }
  }, [answer, characters, questionIndex]);*/

  const outOfFrame = (name: string) => {
    console.log(name + answer)
  
  }

return (
  <div>
  <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
  <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
  <h1>Eco Bacchus</h1>
  <div className='cardContainer'>
    {characters.map((character) =>
      <TinderCard className='swipe' preventSwipe={['up', 'down']} key={character.question} onSwipe={(dir) => swiped(dir, character.question)} onCardLeftScreen={() => outOfFrame(character.question)}>
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
  <div className="buttonsRow">
      <Button type="no" onClickFunction={() => swipe("left")} />
      <Button type="yes" onClickFunction={() => swipe("right")} />
    </div>
</div>
)
}
