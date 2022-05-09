import React from 'react'
import { useSelector, useDispatch ,connect} from 'react-redux'
import { setCount } from '@/store/stateSlice'
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import './index.scss'




function Home() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className='home-page'>
      <Link  to="/MdArticle" >
        <Button type="primary">前端知识库</Button>
      </Link>
    </div>
  )
}


export default Home
