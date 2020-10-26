import React, {useState, useEffect} from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import ProgramList from '../../components/programs/ProgramList';

const UserPrograms = ({currentUser}) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPrograms, setLoadedPrograms] = useState();
   useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/programs/user/${currentUser.userId}`
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
    {!isLoading && loadedPrograms && <ProgramList items={loadedPrograms} currentUser={currentUser} onDeleteProgram={programDeleteHandler}/>}
  </React.Fragment>
);
};

export default UserPrograms;


