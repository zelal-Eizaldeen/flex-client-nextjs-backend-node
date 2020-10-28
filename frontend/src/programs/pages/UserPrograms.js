import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import ProgramList from '../components/ProgramList';

const UserPrograms = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPrograms, setLoadedPrograms] = useState();
  const userId = useParams().userId;

   useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/programs/user/${userId}`
        );
      
         setLoadedPrograms(responseData.programs);
      } catch (err) {}
    };
    fetchPrograms();
  }, [sendRequest]);

  const programDeleteHandler = (deletedProgramId) => {
    setLoadedPrograms(prevPrograms => prevPrograms.filter(program => program.id !== deletedProgramId))
  }
        return (
  <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>
    )}
    {!isLoading && loadedPrograms && <ProgramList items={loadedPrograms}  onDeleteProgram={programDeleteHandler}/>}
  </React.Fragment>
);
};

export default UserPrograms;


