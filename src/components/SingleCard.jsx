import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
        
     }

    return (<li className="card">
        <div className={flipped ? 'flipped' : ''}>
            <img src={card.src} alt="card front" className='front' />
            <img src="/img/cover.png" alt="card cover" className='back' onClick={handleClick}/>
        </div>
    </li> );
}
 
export default SingleCard;