import React from "react";
import PersonInfo from "../PersonInfo"
import {Input} from 'antd';



class PersonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
    }
  }
  filterPoets = () => {
    let filteredPoets = this.props.persons
    filteredPoets = filteredPoets.filter((poet) => {
      let poetName = poet.firstName.toLowerCase() + poet.lastName.toLowerCase()
      return poetName.indexOf(
        this.state.search.toLowerCase()) !== -1
    })
    return(
      filteredPoets
    )
  }

  render() {
    let parasha = this.filterPoets().map((person, index) => {
      return <PersonInfo currentPerson ={person} key={index}/>
    });
    console.log(parasha)
    return (
      <div style={{textAlign:"center"}}>
        <Input  style={{ width: 200, marginBottom: "20px"}}
          value={this.state.search}
          onChange={(e) => {console.log(e.target); this.setState({ search: e.target.value })}}
          placeholder ="Имя"
        />
        {parasha}
      </div>
    )
  }
};

export default PersonList;
