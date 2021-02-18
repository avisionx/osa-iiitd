import React from 'react';
import { Container, Row } from 'reactstrap';
import AppsData from './AppsData';
import AppCard from './AppCard';

const MainHeading = ({ text, id }) => {
  return (
    <h2 className="font-weight-bold mt-1 mb-0 section-title" id={id}>
      {text}
    </h2>
  );
};

const AppsWrapper = () => {
  return (
    <Container className="mx-0 mx-lg-5" fluid>
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
