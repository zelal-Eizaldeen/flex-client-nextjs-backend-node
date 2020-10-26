import React, { useContext } from 'react';
import Router from 'next/router';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';


const NewProgram = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      weight: {
        value: '',
        isValid: false
      },
      // image: {
      //   value: null,
      //   isValid: false
      // }
    },
    false
  );

  const programSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest('https://flex-kuwait.herokuapp.com/api/programs', 'POST', 
        JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            weight: formState.inputs.weight.value,
          }),
          { 'Content-Type': 'application/json'} , {
         Authorization: 'Bearer ' + auth.currentUser
      });
      Router.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="program-form" onSubmit={programSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
       
        <Input
          id="weight"
          element="input"
          label="Weight"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid weight."
          onInput={inputHandler}
        />
         <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        {/* <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        /> */}
        <Button type="submit" disabled={!formState.isValid}>
          ADD PROGRAM
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewProgram;
