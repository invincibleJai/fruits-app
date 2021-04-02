import React from 'react';
import { Page, PageHeader, PageSection, PageSectionVariants, TextContent, Text } from '@patternfly/react-core';
import FruitApp from './components/FruitsApp';
import FruitsProvider from './components/ContextApi/FruitsProvider';

function App() {
  const logoProps = {
    href: 'https://patternfly.org',
    onClick: () => console.log('clicked logo'),
    target: '_blank'
  };
  const Header = (
    <PageHeader style={{ background: '#000', color: '#fff' }} logo={<h1>Fruits App</h1>} logoProps={logoProps}> Fruits App </PageHeader>
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
            <FruitsProvider >
              <FruitApp />
            </FruitsProvider>
          </TextContent>
        </PageSection>
      </Page>
    </>
  );
}

export default App;
