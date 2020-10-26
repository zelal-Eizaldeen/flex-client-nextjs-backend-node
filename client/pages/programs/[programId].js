import React, {useEffect, useState, useContext} from 'react';
import Router from 'next/router'
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';

const ProgramShow = ({program}) => {
  const auth = useContext(AuthContext);

  const programId = program.program.id;
  const [loadedProgram, setLoadedProgram] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/programs/${programId}`
        );
        setLoadedProgram(responseData.program);
        setFormData(
          {
            title: {
              value: responseData.program.title,
              isValid: true
            },
            description: {
              value: responseData.program.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchProgram();
  }, [sendRequest, programId, setFormData]);

  const programUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/programs/${programId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'},
          {Authorization: 'Bearer ' + auth.currentUser}
        
        );
        Router.push('/programs');

    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedProgram && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find program!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedProgram && (
        <form className="program-form" onSubmit={programUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedProgram.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedProgram.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PROGRAM
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};


ProgramShow.getInitialProps = async (context, client) => {  
  const {programId} = context.query;
  const {data} = await client.get(`/api/programs/${programId}`);
    return {program: data}

}

export default ProgramShow;