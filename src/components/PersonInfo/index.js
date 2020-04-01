import React from "react";
import { Button, Col } from "antd";
import "antd/dist/antd.css"


const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>

export default class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPerson: props.currentPerson,
        }
    }

    render() {
        return (
            <div>
                <Col justify="center" align="top" style={{ textAlign: "center" }}>
                        <DemoBox value={100}>col-4</DemoBox>
                        
                </Col>
                <Button type="primary" style={{ margin: "5%" }}>Сгенерировать PDF</Button>
                <Button type="primary" style={{ margin: "5%" }}>Посчитать питание</Button>
                <Button danger type="primary" style={{ margin: "5%" }}>Удалить</Button>
            </div>
        )
    }
}