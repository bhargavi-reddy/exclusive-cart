import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const SearchComponent = ({history}) => {

    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push(`/`)
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control 
                        type='text' 
                        placeholder='search products...' 
                        name='q' className='mr-sm-2 ml-sm-5'
                        onChange={(e) => {setKeyword(e.target.value)}}
                        ></Form.Control>
            <Button type= 'submit' variant='outline-success' className='py-2'>search</Button>
        </Form>
    )
}

export default SearchComponent
