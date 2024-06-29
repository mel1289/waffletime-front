import React from "react";
import { Modal, Button, Row, Col, Carousel } from "react-bootstrap";
import { API_URL } from "../constants"

const ProductModal = (props) => {
	return (
		<Modal
		{...props}
		aria-labelledby="contained-modal-title-vcenter"
		size={"lg"}
		centered
		>
		<Modal.Body className="__productModalBody">
		<Row>
		<Col lg={12} className="">
		{props.product.imageUrl != "" && (
			<img className="__productModalImage" src={`${API_URL}uploads/` + props.product.imageUrl} />
		)}
		</Col>
		<Col className="mt-3 __productModalContent">
		<div className="__titleProduct">{props.product.name}</div>
		<hr />
		<b>Ingrédients:</b>
		<p>{props.product.description}</p>

		<hr />
		<div className="__productModalPrice __center">
		{(props.product.price / 100).toFixed(2)}€
		</div>
		</Col>
		</Row>
		</Modal.Body>
		<Modal.Footer>
		<Button variant="outline-dark" onClick={props.onHide}>
		Fermer
		</Button>
		</Modal.Footer>
		</Modal>
	);
};

export default ProductModal;
