import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const ProgramItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async() => {
    setShowConfirmModal(false);
    try {
      sendRequest( process.env.NEXT_PUBLIC_BACKEND_URL +`/programs/${props.id}`, 'DELETE');
      props.onDelete(props.id);
     
    } catch (err){}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        // onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        // footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        {/* <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div> */}
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          {/* <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div> */}
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>Weight: {props.weight}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Link href="/programs/[programId]" as={`/programs/${props.id}`}>
              <Button>EDIT</Button>
            </Link>
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ProgramItem;
