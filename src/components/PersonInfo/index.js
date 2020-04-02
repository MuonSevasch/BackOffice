import React from "react";
import { Button, Divider, Row, Col, Modal } from "antd"
import "../../global/api"
import api from "../../global/api";


export default class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: null,
        };
    }


    componentDidMount() {
        this.setState({ person : api.getLoot('userForms', this.props.person._id) }); 
    }

    render() {
        console.log(this.props.person)
        return (
            <>
            <h1></h1>
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
