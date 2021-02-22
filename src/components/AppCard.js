import React from 'react';

const AppCard = ({ card }) => {
  return (
    <div className="col-12 col-lg-4 pb-2 mt-2">
      <div className="card shadow border-0">
        <img
          // eslint-disable-next-line
          src={require(`../static/apps/${card.img}`)}
          className="card-img-top"
          alt=""
        />
        <div className="card-body px-3 pb-3 pt-2">
          <h5 className="mb-1 font-weight-bold">{card.title}</h5>
          <p className="mb-0 small">
            {card.tags.map((data) => (
              <span key={data} className="badge badge-main badge-pill mr-1">
                {data}
              </span>
            ))}
          </p>
          <p className="small mb-1 mt-1">{card.desc}</p>
          <div className="row pt-2">
            <div className="col pr-2">
              <a
                href={card.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm rounded btn-outline-primary justify-content-center w-100"
              >
                Go To Application
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
