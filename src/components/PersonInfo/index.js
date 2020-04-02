import React from "react";
import { Button, Divider, Row, Col, Modal } from "antd"
import "../../global/api"


export default class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: null,
        };
    }



    render() {
        return (
            <>
                <h1>{this.props.person.firstName} {this.props.person.lastName}</h1>
                <p>email: {this.props.person.email}</p>
                <p> Рост: {this.props.person.height}</p>
                <p> Вес: {this.props.person.weight}</p>
                <p> Возраст:{this.props.person.age}</p>
                <Button type="primary" size="middle" style={{ margin: "1%" }}>
                    А не пойти бы тебе нахуй
                </Button>
                <Button type="primary" size="middle" style={{ margin: "1%" }}>
                    Сгенерировать PDF
                </Button>
            </>
        );
    }
}
