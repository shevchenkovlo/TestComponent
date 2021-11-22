import {useDocumentId} from 'common/context/DocumentV2Context';
import {useIncomingDocumentNew} from 'common/hooks/incoming';
import useIncomingRemoteDocument from 'common/hooks/incoming/useIncomingRemoteDocument';
import {isEmptyDocumentIdV2} from 'common/utils/documentId';

const useDocument = (documentId) => {
	//const documentId = useDocumentId();

	const isNew = isEmptyDocumentIdV2(documentId);

	const newDocumentQuery = useIncomingDocumentNew(isNew);
	const existingDocumentQuery = useIncomingRemoteDocument(documentId, !isNew);

	return isNew ? newDocumentQuery : existingDocumentQuery;
};

export default useDocument;
