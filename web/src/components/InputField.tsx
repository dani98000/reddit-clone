import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  let InputOrTextarea = Input;
  if (props.textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <InputOrTextarea
        {...field}
        id={field.name}
        placeholder={props.placeholder}
        type={props.type}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
