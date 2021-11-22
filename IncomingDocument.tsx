import {VFC} from 'react';

import {IncomingDocumentContext} from 'common/context/IncomingDocumentContext';
import {useIncomingDocumentState} from 'common/hooks/incoming';
import {DocumentIdV2} from 'common/types/document/documentId';
import {DocumentTab, ErrorLoader, Loader, useDocumentTabs, Stringify} from 'components';
import {ResolutionConnect} from 'components/Resolution/Resolution.connect';

import Card from './Card.partial';
import Header from './Header.partial';
import History from './History.partial';

import styles from './IncomingDocument.module.scss';

type IProps = {
	documentId: DocumentIdV2;
}

const IncomingDocument: VFC<IProps> = (props) => {
	const tabs = [
		DocumentTab.Card,
		DocumentTab.Resolution,
		DocumentTab.History,
	].filter(Boolean);

	const {data: state, error, isLoading} = useIncomingDocumentState(props.documentId);

	const {activeTab, DocumentTabs} = useDocumentTabs(DocumentTab.Card, tabs);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorLoader />;
	}

	return (
		<IncomingDocumentContext.Provider value={{state}}>
			<div className={styles.wrapper}>
				<Header />

				<DocumentTabs />

				<div className={styles.content}>
					{(() => {
						switch (activeTab) {
							case DocumentTab.Card:
								return <Stringify object={state} />;

							case DocumentTab.Resolution:
								return <ResolutionConnect />;

							case DocumentTab.History:
								return <History />;
						}
					})()}
				</div>
			</div>
		</IncomingDocumentContext.Provider>
	);
};

export default IncomingDocument;
