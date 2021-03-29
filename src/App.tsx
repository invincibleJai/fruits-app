import React from 'react';
import { Page, PageHeader, PageSection, PageSectionVariants, TextContent, Text } from '@patternfly/react-core';
import FruitsList from './components/FruitsList';
import AddFruits from './components/AddFruits';

// import "@patternfly/react-core/dist/styles/base.css";
// import './fonts.css';

function App() {
  const Header = (
    <PageHeader style={{ background: '#000', color: '#fff' }} logo={<h1>Fruits App</h1>}> Fruits App </PageHeader>
  );
  return (
    <>
      <Page
        header={Header}
        isManagedSidebar
      >
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Show Fruits</Text>
            <Text component="p">
              List the Fruits and season they are available in, can Add or remove fruits as well.
              </Text>
              <AddFruits />
              <FruitsList />
          </TextContent>
        </PageSection>
      </Page>
    </>
  );
}

export default App;
