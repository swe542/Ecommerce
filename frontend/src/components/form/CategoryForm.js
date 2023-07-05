import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  ButtonGroup,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react";
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <FormControl>
        <Flex>
          <Input
            placeholder="Enter new category"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size={"sm"}
          />

          <Button size={"sm"} onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </Flex>
      </FormControl>
    </>
  );
};

export default CategoryForm;
