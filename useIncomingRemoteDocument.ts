import {useQuery} from 'react-query';

import {getDocument} from 'common/api/v2';
import client from 'common/client';
import {DocumentIdV2} from 'common/types/document/documentId';
import {IncomingDocument} from 'common/types/remote/v2';

const useIncomingRemoteDocument = (documentId: DocumentIdV2, enabled: boolean) => useQuery(['document', {...documentId}], () => getDocument(documentId), {enabled});

export default useIncomingRemoteDocument;
