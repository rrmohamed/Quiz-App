import { useRef, useState } from 'react' ;
import data from '../../Data/data';

const Quiz = () => {

  let [index, setIndex] = useState(0) ;
  const [question, setQuestion] = useState(data[index]) ;
  const [lock , setLock] = useState(false) ;
  const [score, setScore] = useState(0) ;
  let [result , setResult] = useState(false)

  const option1 = useRef(null) ;
  const option2 = useRef(null) ;
  const option3 = useRef(null) ;
  const option4 = useRef(null) ;

  const options_array = [option1, option2, option3, option4] ;
  


  const CheckAns = (e , ans)=>{
    if(lock === false){
      if(ans === question.ans){
        e.target.classList.add('bg-green-300') ; 
        setLock(true) ;
        setScore(prev=>prev+1) ;
      }
      else{
        e.target.classList.add('bg-red-300') ;
        setLock(true) ;
        options_array[question.ans-1].current.classList.add('bg-green-300') ;
      }
  }
  }

  const NextQuestion = () => {
    if(lock === true){
      if(index === data.length -1){
        setResult(true) ;
        return 0 ;
      }
      setIndex(++index) ;
      setQuestion(data[index]) ;
      setLock(false) ;
      options_array.map(option => {
        option.current.classList.remove('bg-green-300', 'bg-red-300') ;
        return null ;
      }) ;
    }
  }

  const resetBtn = ()=>{
    setIndex(0);
    setQuestion(data[0]) ;
    setScore(0) ;
    setLock(false) ;
    setResult(false) ;
  }


  return <>
  <div className=" container max-w-2xl bg-white text-black p-6 rounded-md mx-auto space-y-6">
    <h1 className="text-3xl font-semibold ">Quiz App</h1>
    <hr className='' />
    {result?<>
    
    <h2>You scored {score} out of {data.length} </h2>
    <button onClick={()=>resetBtn()} className='bg-indigo-700 text-slate-50 hover:bg-slate-800 transition-all duration-300 cursor-pointer text-white px-8 py-2 rounded-md'>Reset</button>
    
    </>:<>
    <h2 className='text-xl font-semibold'>{index+1}. {question.question}</h2>
    <ul className='space-y-2'>
      <li ref={option1} onClick={(e) => CheckAns(e, 1)} className='cursor-pointer border border-gray-300 rounded-md p-2'>{question.option1}</li>
      <li ref={option2} onClick={(e) => CheckAns(e, 2)} className='cursor-pointer border border-gray-300 rounded-md p-2'>{question.option2}</li>
      <li ref={option3} onClick={(e) => CheckAns(e, 3)} className='cursor-pointer border border-gray-300 rounded-md p-2'>{question.option3}</li>
      <li ref={option4} onClick={(e) => CheckAns(e, 4)} className='cursor-pointer border border-gray-300 rounded-md p-2'>{question.option4}</li>
    </ul>
    <div className=" flex justify-between items-center">
      <button onClick={() => NextQuestion()} className='bg-indigo-700 text-slate-50 hover:bg-slate-800 transition-all duration-300 cursor-pointer text-white px-8 py-2 rounded-md'>Next</button>
      <div  className="index text-sm text-gray-500">{index+1} of {data.length} Questions</div>
    </div>
    </>}

  </div>
  
  </>
} 

export default Quiz ;
