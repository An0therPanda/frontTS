import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Modal } from "react-bootstrap";

interface Ataque {
  nombre: string;
  pvp: {
    dano: number;
    energia: number;
  };
  pve: {
    dano: number;
    energia: number;
  };
}

function ModificarAtaqueCargado(): JSX.Element {
  const { idAtaque } = useParams<{ idAtaque: string }>();
  const [ataque, setAtaque] = useState<Ataque | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resultadoAtaque = await axios.get<Ataque>(
        `${process.env.REACT_APP_BACKEND_URL}/api/ataquecargado/${idAtaque}`
      );
      setAtaque(resultadoAtaque.data);
    };
    fetchData();
  }, [idAtaque]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const danoPVP = (e.target as any).inputDanoPVP.value;
    const energiaPVP = (e.target as any).inputEnergiaPVP.value;
    const danoPVE = (e.target as any).inputDanoPVE.value;
    const energiaPVE = (e.target as any).inputEnergiaPVE.value;

    const body = {
      pvp: {
        dano: danoPVP,
        energia: energiaPVP,
      },
      pve: {
        dano: danoPVE,
        energia: energiaPVE,
      },
    };

    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/ataquecargado/${idAtaque}`,
        body
      )
      .then((response) => {
        console.log(response.data);
        setModalVisible(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleModalClose() {
    setModalVisible(false);
    navigate("/admin/ataques");
  }

  if (ataque === null) {
    return <div>Cargando...</div>;
  }

  return (
    <Container>
      <h2 className="text-center mt-2 font-weight-bold">
        Modificar ataque cargado
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" value={ataque.nombre} disabled />
          <br />
          <h4 className="text-center mt-2 font-weight-bold">PVP</h4>
          <Form.Label>Daño:</Form.Label>
          <Form.Control
            type="number"
            defaultValue={ataque.pvp.dano}
            id="inputDanoPVP"
          />
          <Form.Label>Energia:</Form.Label>
          <Form.Control
            type="number"
            defaultValue={ataque.pvp.energia}
            id="inputEnergiaPVP"
          />
          <br />
          <h4 className="text-center mt-2 font-weight-bold">PVE</h4>
          <Form.Label>Daño:</Form.Label>
          <Form.Control
            type="number"
            defaultValue={ataque.pve.dano}
            id="inputDanoPVE"
          />
          <Form.Label>Energía:</Form.Label>
          <Form.Control
            type="number"
            defaultValue={ataque.pve.energia}
            id="inputEnergiaPVE"
          />
          <br />
        </Form.Group>
        <Button variant="success" type="submit">
          Guardar cambios
        </Button>
      </Form>
      <Modal show={modalVisible} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambios guardados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          El ataque cargado ha sido modificado exitosamente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ModificarAtaqueCargado;
