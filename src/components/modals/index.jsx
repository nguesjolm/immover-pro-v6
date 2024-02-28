import React from 'react';
import {useSelector} from 'react-redux';
import {CommitmentModal} from './CommitmentModal';
import {TypesOperationModal} from './TypesOperationModal';
import {PropertyTypesModal} from './PropertyTypesModal';
import {CitiesModal} from './CitiesModal';
import {ErrorModal} from './ErrorModal';
import {SuccessModal} from './SuccessModal';
import {StateModal} from './StateModal';
import {ProprosedOfferedModal} from './ProprosedOfferedModal';
import {ValidatedProprosedModal} from './ValidatedProprosedModal';
import {NotifPreviewModal} from './NotifPreviewModal';

export const ModalRouters = () => {
  //

  const {
    commitmentModal,
    typesOperationModal,
    propertyTypesModal,
    errorModal,
    successModal,
    citiesModal,
    stateModal,
    proprosedOfferedModal,
    validatedProprosedModal,
    notifPreviewModal,
  } = useSelector(s => s.modalState);

  return (
    <>
      {commitmentModal && <CommitmentModal />}
      {typesOperationModal && <TypesOperationModal />}
      {propertyTypesModal && <PropertyTypesModal />}
      {citiesModal && <CitiesModal />}
      {errorModal && <ErrorModal />}
      {successModal && <SuccessModal />}
      {stateModal && <StateModal />}
      {proprosedOfferedModal && <ProprosedOfferedModal />}
      {validatedProprosedModal && <ValidatedProprosedModal />}
      {notifPreviewModal && <NotifPreviewModal />}
    </>
  );
};
