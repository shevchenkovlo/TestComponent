import {useEffect, useMemo, useState} from 'react';

import {useIncomingDocumentNew} from 'common/hooks/incoming';
import {DocumentIdV2} from 'common/types/document/documentId';
import {IncomingDocument, IncomingDocumentState} from 'common/types/incoming';
import useDocument from 'containers/IncomingDocument/hooks/useDocument';

const useIncomingDocumentState = (documentId: DocumentIdV2) => {
	const {
	 	data: initialDocument,
	 	error,
	 	isLoading,
	 } = useDocument(documentId);

	if (initialDocument){}
	const [document, onDocumentChange] = useState<IncomingDocument>();
	const [attachedFiles, onAttachedFilesChange] = useState<File[]>([]);

	useEffect(() => {
		onDocumentChange(initialDocument as IncomingDocument); //переделать
	}, [initialDocument]);

	const data = useMemo(() => {
		if (!document) {
			return null;
		}

		const state: IncomingDocumentState = {
			attachedFiles,
			document,
			onAttachedFilesChange,
			onDocumentChange,
		};

		return state;
	}, [attachedFiles, document, onAttachedFilesChange, onDocumentChange]);

	return {
		data,
		error,
		isLoading: isLoading || !data,
	};
};

export default useIncomingDocumentState;
