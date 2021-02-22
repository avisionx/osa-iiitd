import React from 'react';
import { Container, Row } from 'reactstrap';
import AppsData from './AppsData';
import AppCard from './AppCard';

const MainHeading = ({ text, id }) => {
  return (
    <h2 className="font-weight-bold mt-3 mb-1 main-heading" id={id}>
      {text}
    </h2>
  );
};

const AppsWrapper = () => {
  return (
    <Container className="px-3 px-md-5" fluid>
      {Object.keys(AppsData).map((heading) => (
        <div key={heading}>
          <MainHeading text={heading} id={heading} />
          <Row>
            {AppsData[heading].map((AppData) => (
              <AppCard key={AppData.title} card={AppData} />
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default AppsWrapper;
