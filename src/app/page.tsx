'use client';
import React, { use, useEffect, useState, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import Button from './components/button/Button';
import Checkbox from './components/checkbox/checkbox';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';


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
  
  const characters = db;
  const [cardContainer, setCardContainer] = useState<HTMLDivElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  let [ttsStatus, setChecked] = useState();
  
  useEffect(() => {
    setCardContainer(cardContainerRef.current);
  }, []);

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
      if (cardContainer?.lastChild) {
        cardContainer.removeChild(cardContainer.lastChild);
      }
    }
    if(questionIndex == 0){
      document.getElementById("buttonsRow")?.remove();

    }
  }

  function tts(text: string){
    let checkbox = document.getElementById('toggleTts') as HTMLInputElement
    // We have to remove this TTS part who is working in local but not in production
    // if(checkbox.checked){
    //   let newUtterance = new SpeechSynthesisUtterance(
    //     text
    //   );
    //   synth.speak(newUtterance)
    // }
  }

  function buttonActions(direction: string) {
    swiped(direction, characters[questionIndex].question);
    () => outOfFrame(characters[questionIndex].question);

  }

  const swiped = (direction: string, cardKey: string) => {
    
    let newAnswer = direction === 'left' ? 'Non' : 'Oui';
    setAnswer(newAnswer);
    answer = newAnswer
    tts("Tu as répondu "+answer)

    if (answer === characters[questionIndex].response) {
      showAlert(true);
      tts("Bravo")
    } else {
      showAlert(false);
      tts("Raté")
    }
    setLastDirection(direction);

    if(questionIndex == 0){
      document.getElementById("buttonsRow")?.remove();
      
    }
    setQuestionIndex((prevIndex) => prevIndex - 1);
  };


  const outOfFrame = (name: string) => {
    console.log(name + answer)
  
  }

return (
  <div>
    <div className="TTS" id="tts">
    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512"><path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z"/></svg>
      <Checkbox></Checkbox> 
      
    </div>
  <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
  <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
  <h1>Eco Bacchus</h1>
  <div className='cardContainer' id="cardContainerDiv" ref={cardContainerRef}>
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
  <div className="buttonsRow" id="buttonsRow">
      <Button type="no" onClickFunction={() => swipe("left")} />
      <Button type="yes" onClickFunction={() => swipe("right")} />
    </div>
</div>
)
}
