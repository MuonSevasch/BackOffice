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
                <h4>email: {this.props.person.email}</h4>
                <h4> Рост: {this.props.person.height}</h4>
                <h4> Вес: {this.props.person.weight}</h4>
                <h4> Возраст: {this.props.person.age}</h4>
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
