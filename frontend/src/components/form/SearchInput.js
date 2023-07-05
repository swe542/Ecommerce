import { Button, Input, InputGroup } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSearch } from '../../context/search'


const SearchInput = () => {
    const[values,setValues]=useSearch()
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.get(
            `/api/v1/product/search/${values.keyword}`
          );
          setValues({ ...values, results: data });
          navigate("/search");
        
        } catch (error) {
          console.log(error);
        }
      
      };
  return (
  <>
  <InputGroup  w={{ base: "full", md: "auto" }}>
  <Input
            type="text"
            placeholder="Search"
            size="sm"
            value={values.keyword}
            onChange={(e)=>setValues({...values,keyword:e.target.value})}
          
          />
  <Button size="sm" borderRadius={'none'} onClick={handleSubmit}>Q</Button>
  </InputGroup>
    
          
  </>
  )
}

export default SearchInput