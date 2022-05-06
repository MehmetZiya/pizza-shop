import { Modal, Button, Row, Col } from 'react-bootstrap'
const ModalDetails = (props) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title
          id='contained-modal-title-vcenter'
          style={{ color: '#598376' }}
        >
          {props.pizza.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <img
              src={props.pizza.image}
              alt={props.pizza.name}
              className='img-fluid mx-auto d-block'
              style={{ height: '300px', width: '300px' }}
            />
          </Col>
          <Col>
            <p className='p-3'>{props.pizza.description}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={props.onHide}>
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDetails
