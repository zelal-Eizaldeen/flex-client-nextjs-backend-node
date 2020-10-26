import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import ProgramItem from './ProgramItem';
import Button from '../../shared/components/FormElements/Button';

const ProgramList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No programs found. Maybe create one?</h2>
          <Button to="/programs/new">Share Program</Button>
        </Card>
      </div>
    );
  }

  return ( 
    <ul className="program-list">
      {props.items.map((program) => (
        <ProgramItem
          key={program.id}
          id={program.id}
          // image={program.imageUrl}
          title={program.title}
          description={program.description}
          weight={program.weight}
          creatorId={program.creator}
          currentUser={props.currentUser}
          onDelete={props.onDeleteProgram}
        
        />
      ))}
    </ul>
  );
};

export default ProgramList;
