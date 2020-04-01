import React from "react";

const PersonInfo = persons => {
  const personList = persons.map((currentPerson, index) => {
    return <PersonInfo currentPerson={currentPerson}></PersonInfo>;
  });
  return <div>{personList}</div>;
};

export default PersonInfo;
