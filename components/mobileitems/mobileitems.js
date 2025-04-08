import React, { useState, Fragment } from "react";
import classNames from "classnames";
import classes from "./mobileitems.module.less";



const MobileItems = () => {
  
  const [services, setServices] = useState([
    { id: 0, name: "Car |", active: true },
    { id: 1, name: "Tour |", active: false },
    { id: 2, name: "Hotel |", active: false }
  ]);

  const setService = (service) => {
    let newServices = services.map((item) => {
      if (item.id === service.id) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });

    setServices(newServices);
  };

 
  return (
    <div className={classNames(classes.ovelay_search_second)}>
      <div className={classNames(classes.overlay_search_services_second)}>
        {services?.map((service, index) => {
          return (
            <Fragment key={index}>
              <span
                onClick={() => setService(service)}
                className={[
                  classNames("overlay_search_item_second"),
                  classNames(service?.active ? " active" : ""),
                ]}
              >
                {service.name}
              </span>
              {index < services.length - 1 && (
                <span className={classNames(classes.overlay_search_item_seperator_second)}>{""}</span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MobileItems;