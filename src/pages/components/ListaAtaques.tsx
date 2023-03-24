import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import Paginacion from "./Paginacion";

interface AtaqueRapido {
  id: number;
  nombre: string;
  tipo:{
    label: string;
    id: number;
  };
  pvp: {
    dano: number;
    energia: number;
    turno: number;
  };
  pve: {
    dano: number;
    energia: number;
  };
}

interface AtaqueCargado {
  id: number;
  nombre: string;
  tipo:{
    label: string;
    id: number;
  };
  pvp: {
    dano: number;
    energia: number;
    danoporenergia: number;
  };
  pve: {
    dano: number;
    energia: number;
  };
}

function ListaAtaques() {
  const [ataquesRapidos, setAtaquesRapidos] = useState<AtaqueRapido[]>([]);
  const [ataquesCargados, setAtaquesCargados] = useState<AtaqueCargado[]>([]);
  const [paginaActualAtaqueRapido, setPaginaActualAtaqueRapido] = useState(1);
  const [paginaActualAtaqueCargado, setPaginaActualAtaqueCargado] = useState(1);
  const [elementosPorPagina] = useState(13);

  useEffect(() => {
    const fetchData = async () => {
      const resultadosAtaquesRapidos = await axios.get<AtaqueRapido[]>(
        "http://localhost:8000/api/ataquesrapidos"
      );
      const resultadosAtaquesCargados = await axios.get(
        "http://localhost:8000/api/ataquescargados"
      );
      setAtaquesRapidos(resultadosAtaquesRapidos.data);
      setAtaquesCargados(resultadosAtaquesCargados.data);
    };
    fetchData();
  }, [paginaActualAtaqueCargado, paginaActualAtaqueRapido]);

  const indexUltimoItemAtaqueRapido =
    paginaActualAtaqueRapido * elementosPorPagina;
  const indexPrimerItemAtaqueRapido =
    indexUltimoItemAtaqueRapido - elementosPorPagina;
  const itemsActualesAtaqueRapido = ataquesRapidos.slice(
    indexPrimerItemAtaqueRapido,
    indexUltimoItemAtaqueRapido
  );

  const indexUltimoItem = paginaActualAtaqueCargado * elementosPorPagina;
  const indexPrimerItemAtaque = indexUltimoItem - elementosPorPagina;
  const itemsActualesAtaqueCargado = ataquesCargados.slice(
    indexPrimerItemAtaque,
    indexUltimoItem
  );

  const paginacionAtaqueRapido = (numeroPagina: number) =>
    setPaginaActualAtaqueRapido(numeroPagina);

  const paginacionAtaqueCargado = (numeroPagina: number) =>
  setPaginaActualAtaqueCargado(numeroPagina);

  return (
    <Container className="position-relative">
      <h2 className="text-center mt-2 font-weight-bold">
        Lista de ataques rápidos
      </h2>
      <Container className="container-fluid">
        <Table bordered hover size="m" className="position-relative">
          <thead className="bg-danger text-center">
            <tr>
              <th className="text-white align-middle" rowSpan={2}>
                Nombre
              </th>
              <th className="text-white align-middle" rowSpan={2}>
                Tipo
              </th>
              <th className="text-white" colSpan={3}>
                PVP
              </th>
              <th className="text-white" colSpan={2}>
                PVE
              </th>
            </tr>
            <tr>
              <th className="text-white">Daño</th>
              <th className="text-white">Energía</th>
              <th className="text-white">Turno</th>
              <th className="text-white">Daño</th>
              <th className="text-white">Energía</th>
            </tr>
            </thead>
          <tbody className="text-center">
            {itemsActualesAtaqueRapido.map((ataque) => (
              <tr key={ataque.id}>
                <td>{ataque.nombre}</td>
                <td>{ataque.tipo.label}</td>
                <td>{ataque.pvp.dano}</td>
                <td>{ataque.pvp.energia}</td>
                <td>{ataque.pvp.turno}</td>
                <td>{ataque.pve.dano}</td>
                <td>{ataque.pve.energia}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginacion elementosTotatales={ataquesRapidos.length} elementosPorPagina={elementosPorPagina} onPageChange={paginacionAtaqueRapido} paginaActual={paginaActualAtaqueRapido}/>
      </Container>
      <h2 className="text-center mt-2 font-weight-bold">
        Lista de ataques cargados
      </h2>
      <Container className="container-fluid">
        <Table bordered hover size="m" className="position-relative">
          <thead className="bg-danger text-center">
            <tr>
              <th className="text-white" rowSpan={2}>
                Nombre
              </th>
              <th className="text-white" rowSpan={2}>
                Tipo
              </th>
              <th className="text-white" colSpan={3}>
                PVP
              </th>
              <th className="text-white" colSpan={2}>
                PVE
              </th>
            </tr>
            <tr>
              <th className="text-white">Daño</th>
              <th className="text-white">Energía</th>
              <th className="text-white">DPE</th>
              <th className="text-white">Daño</th>
              <th className="text-white">Energía</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {itemsActualesAtaqueCargado.map((ataque) => (
              <tr key={ataque.id}>
                <td>{ataque.nombre}</td>
                <td>{ataque.tipo.label}</td>
                <td>{ataque.pvp.dano}</td>
                <td>{ataque.pvp.energia}</td>
                <td>{JSON.stringify(ataque.pvp.danoporenergia)}</td>
                <td>{ataque.pve.dano}</td>
                <td>{ataque.pve.energia}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginacion elementosTotatales={ataquesCargados.length} elementosPorPagina={elementosPorPagina} onPageChange={paginacionAtaqueCargado} paginaActual={paginaActualAtaqueCargado}/>
      </Container>
    </Container>
  );
}           
export default ListaAtaques;