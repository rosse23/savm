import { React, useState, useEffect } from 'react';
import { RiDeleteBin5Fill, RiEdit2Fill } from 'react-icons/ri';
import { SiDocusign } from 'react-icons/si';
import { BsJournalText } from 'react-icons/bs';
import { VisitRequests, ClientRequests } from '../../lib/api/';
import { errorActions } from '../../store/error';
import { useDispatch } from 'react-redux';
import Container from '../UI/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from '../client/GetClientinfo.module.css';
import { Form } from '../UI/Form';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import SampleReport from '../reports/AnimalReport';
import { PDFDownloadLink } from '@react-pdf/renderer';
const GetVisit = () => {
  const [visit, setVisit] = useState({});
  const [owner, setOwner] = useState({});
  let { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  let query = new URLSearchParams(search);
  let id = query.get('id');
  useEffect(() => {
    const getvisit = async () => {
      const result = await VisitRequests.getOne(
        id,
        localStorage.getItem('userToken')
      );
      setVisit(result.data.data);
      const res = await ClientRequests.getOne(
        result.data.data.client,
        localStorage.getItem('userToken')
      );
      setOwner(res.data.data);
      if (result.status === 'fail') {
        dispatch(
          errorActions.setError(Object.values(JSON.parse(result.message)))
        );
        return;
      }
    };
    getvisit();
  }, []);
  const actionDelete = async (e) => {
    e.preventDefault();
    setShowModal(!showModal);
    const result = await VisitRequests.deleteOne(
      id,
      localStorage.getItem('userToken')
    );

    if (result.status === 'fail') {
      console.log(result.message);
      dispatch(
        errorActions.setError(Object.values(JSON.parse(result.message)))
      );
      return;
    }
    navigate({ pathname: '/app/visit/' }, { replace: true });
  };
  const actionUpdate = async (e) => {
    e.preventDefault();
    navigate({ pathname: `/app/visit/editvisit?id=${id}` }, { replace: true });
  };
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };
  return (
    <Container>
      <div className={classes.GetClientinfo}>
        <h2 className={classes.title}>Datos de la Visita</h2>
        <Form>
          <div className={classes.port}>
            <div className={classes.info}>
              <BsJournalText />
              <h3>{visit.pet?.name}</h3>
            </div>
            <div className={classes.Navop}>
              <button
                className={classes.ico1}
                onClick={() => setShowModal(!showModal)}
              >
                <RiDeleteBin5Fill />
                <span className={classes.tooltiptext}>Eliminar</span>
              </button>
              <button className={classes.ico1} onClick={actionUpdate}>
                <RiEdit2Fill />
                <span className={classes.tooltiptext}>Editar</span>
              </button>
              <button className={classes.ico1}>
                <PDFDownloadLink
                  document={<SampleReport owner={owner} visit={visit} />}
                  fileName={`reporte-visita`}
                >
                  <SiDocusign />
                </PDFDownloadLink>
                <span className={classes.tooltiptext}>PDf</span>
              </button>
            </div>
            <Modal showModal={showModal}>
              <p>Esta seguro de eliminar esta visita?</p>
              <div className={classes.buttons}>
                <Button onClick={() => setShowModal(!showModal)}>
                  Cancelar
                </Button>
                <Button onClick={actionDelete}>Aceptar</Button>
              </div>
            </Modal>
          </div>
          <div className={classes.contenido}>
            <div className={classes.cols2}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Cliente: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{owner.name}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Fecha: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{formatDate(visit.fechaReg)}</p>
                </div>
              </div>
            </div>
            <div className={classes.cols2}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Motivo: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{visit.reason}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Precio: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{visit.price} Bs.</p>
                </div>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Diagnóstico: </p>
              </div>
              <div className={classes.formresp}>
                <p>{visit.diagnosis}</p>
              </div>
            </div>
            <div className={classes.formsection}>
              <div className={classes.formtitle}>
                <p>Tratamiento: </p>
              </div>
              <div className={classes.formresp}>
                <p>{visit.treatment}</p>
              </div>
            </div>
            <div className={classes.title2}>
              <h3>Parametros de Visita</h3>
            </div>

            <div className={classes.cols3}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Peso: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{visit.visitParams?.weight} kilos</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Temperatura:</p>
                </div>
                <div className={classes.formresp}>
                  <p>{visit.visitParams?.temperature}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Pulso: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{visit.visitParams?.heartbeat} </p>
                </div>
              </div>
            </div>
            <div className={classes.cols3}>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Frecuencia cardiaca: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{visit.visitParams?.heartRate}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Frecuencia respiratoria:</p>
                </div>
                <div className={classes.formresp}>
                  <p>{visit.visitParams?.breathingFrequency}</p>
                </div>
              </div>
              <div className={classes.formsection}>
                <div className={classes.formtitle}>
                  <p>Palpación Abdominal: </p>
                </div>
                <div className={classes.formresp}>
                  <p>{visit.visitParams?.abdominalPalpation}</p>
                </div>
              </div>
            </div>
            <div className={classes.title2}>
              <h3>Medicamentos proporcionados en la visita</h3>
            </div>
            {visit.medicines?.map((medicine) => (
              <div className={classes.cols3}>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Producto: </p>
                  </div>
                  <div className={classes.formresp}>
                    <p>{medicine.product}</p>
                  </div>
                </div>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Marca:</p>
                  </div>
                  <div className={classes.formresp}>
                    <p>{medicine.brand}</p>
                  </div>
                </div>
                <div className={classes.formsection}>
                  <div className={classes.formtitle}>
                    <p>Detalle:</p>
                  </div>
                  <div className={classes.formresp}>
                    <p>{medicine.kind}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default GetVisit;
