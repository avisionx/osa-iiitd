import React, { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
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
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState(AppsData);

  useEffect(() => {
    const newData = {};
    Object.keys(AppsData).map((key) => {
      newData[key] = [];
      AppsData[key].map((data) => {
        if (
          key.toString().toLowerCase().includes(search.toLowerCase()) ||
          data.title.toString().toLowerCase().includes(search.toLowerCase()) ||
          data.tags.toString().toLowerCase().includes(search.toLowerCase())
        ) {
          newData[key].push(data);
        }
        return data;
      });
      if (newData[key].length === 0) {
        delete newData[key];
      }
      return key;
    });
    setSearchData(newData);
  }, [search]);

  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Container className="px-3 px-md-5" fluid>
      <div className="row mt-3">
        <div className="col-12 input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text bg-primary text-white">
              <h5 className="d-none d-md-block mb-0 mr-1">Search</h5>
              <Icon className="my-auto" path={mdiMagnify} size={1} />
            </div>
          </div>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by Title, Tags or Group..."
            value={search}
            onChange={changeSearch}
          />
        </div>
      </div>
      {Object.keys(searchData).length > 0 ? (
        Object.keys(searchData).map((heading) => (
          <div key={heading}>
            <MainHeading text={heading} id={heading} />
            <Row>
              {searchData[heading].map((AppData) => (
                <AppCard key={AppData.title} card={AppData} />
              ))}
            </Row>
          </div>
        ))
      ) : (
        <div className="text-center h5 my-5 py-5">
          Nothing to match the search!
        </div>
      )}
    </Container>
  );
};

export default AppsWrapper;
