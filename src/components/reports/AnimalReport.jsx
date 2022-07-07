import { useEffect } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import huella from '../../imgs/huella.png';
// import { MdOutlinePets } from 'react-icons/md';
import logo from '../../imgs/nombre.png';

export default function SampleReport(props) {
  const visit = props.visit;
  const owner = props.owner;
  const date = new Date().toLocaleDateString();
  const mockData = {
    animal: {
      name: 'Nobue',
      ownerName: 'Jhon Doe',
      symptoms: 'Tiene Vomitos',
      diagnosis: 'Comio demasiado',
      treatment:
        'Aplicar DiazepamTretico y lo demas que se sugiera, otro texto para probar data',
      date: '2022-06-13',
      cost: '30',
      currency: 'Bs',
    },
    animalStats: {
      weight: '58kg',
      temperature: '45',
      pulse: '48',
      heartRate: '74',
      breathingRate: '20',
      abdominalPalpation: 'Regular',
    },
    meds: [
      {
        productName: 'BioFlor',
        brand: 'Welzur',
        detail: 'Antibiotico',
      },
      {
        productName: 'BioDex',
        brand: 'Biofarm',
        detail: 'Antiinflamatorio',
      },
    ],
  };

  useEffect(() => {
    //TODO use it to fetch data
    //Also you can pass the data from props or global state (eg. Redux)
    //I'm gonna use mock data due this is a poc :)
  }, []);

  const styles = {
    page: {
      fontSize: 10,
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    invoiceInfoContainer: {
      flexDirection: 'row',
      fontSize: 12,
      borderBottom: 1,
    },
    titleContainer: {
      marginTop: 20,
      marginBottom: 20,
      fontSize: 13,
      borderTop: 2,
      borderBottom: 2,
      borderColor: '#006277',
      color: '#006277',
      fontWeight: '900',
    },
    table: {
      fontSize: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowChildren: {
      flex: 3,
      borderTop: 1,
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 10,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    info: {
      data: {
        flex: 2,
        padding: '0 20',
      },
      image: {
        flex: 2,
        padding: '0 20',
      },
      title: {
        flexBasis: '40%',
      },
      simpleBody: {
        flexBasis: '60%',
        textAlign: 'right',
      },
      body: {
        textAlign: 'right',
        flexBasis: '60%',
      },
      flexDirection: 'row',
    },
    stats: {
      item: {
        flex: 1,
        padding: 3,
      },
    },
    summary: {
      titleRow: {
        color: '#006277',
        fontWeight: '900',
        borderBottom: 2,
        borderColor: '#006277',
      },
      item: {
        borderBottom: 1,
        borderColor: '#006277',
        padding: 3,
      },
      column: {
        flex: 1,
      },
    },
    title: {
      color: '#006277',
      fontWeight: '900',
    },
    rowItem: {
      paddingBottom: '15',
    },
  };

  // Font.register({
  //   family: 'Lato',
  //   src: 'https://fonts.googleapis.com/css2?family=Gentium+Plus&display=swap'
  // });
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const result = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return result;
  };

  return (
    <Document>
      <Page size='LETTER' style={styles.page}>
        <View style={styles.invoiceInfoContainer}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ maxHeight: 90, maxWidth: 120, marginBottom: 0 }}
              src={logo}
            />
            <Text>Fecha De Reporte: {date}</Text>
          </View>
          <View style={{ flex: 1, textAlign: 'right' }}>
            <Text>Veterinaria La Madriguera</Text>
            <Text>Direccion: </Text>
            <Text>Calle Nazarea #54</Text>
            <Text>Tel: 61911213</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={{ textAlign: 'center' }}>REPORTE DE VISITA</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.info.data}>
            <View style={[styles.row, styles.rowItem]}>
              <View style={styles.info.title}>
                <Text style={styles.title}>Nombre: </Text>
              </View>
              <View style={styles.info.body}>
                <Text>{visit.pet?.name}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.rowItem]}>
              <View style={styles.info.title}>
                <Text style={styles.title}>Nombre Dueño: </Text>
              </View>
              <View style={styles.info.body}>
                <Text>{owner.name}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.rowItem]}>
              <View style={styles.info.title}>
                <Text style={styles.title}>Dirección: </Text>
              </View>
              <View style={styles.info.body}>
                <Text>{owner.address}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.rowItem]}>
              <View style={styles.info.title}>
                <Text style={styles.title}>Fecha: </Text>
              </View>
              <View style={styles.info.body}>
                <Text>{formatDate(visit.fechaReg)}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.rowItem]}>
              <View style={styles.info.title}>
                <Text style={styles.title}>Sintomas: </Text>
              </View>
              <View style={styles.info.body}>
                <Text>{visit.reason}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.rowItem]}>
              <View style={styles.info.title}>
                <Text style={styles.title}>Diagnostico: </Text>
              </View>
              <View style={styles.info.body}>
                <Text>{visit.diagnosis}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.rowItem]}>
              <View style={styles.info.title}>
                <Text style={styles.title}>Tratamiento: </Text>
              </View>
              <View style={styles.info.body}>
                <Text>{visit.treatment}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.rowItem]}>
              <View style={styles.info.title}>
                <Text style={styles.title}>Costo: </Text>
              </View>
              <View style={styles.info.body}>
                <Text>
                  {visit.price}
                  {mockData.animal.currency}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.info.image}>
            <View>
              <Image
                src={huella}
                style={{ minHeight: '130', maxHeight: '100%', height: '180' }}
              />
            </View>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={{ textAlign: 'center' }}>Datos Del Paciente</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.info.data}>
            <View style={[styles.row]}>
              <View style={[styles.row, styles.stats.item]}>
                <View>
                  <Text style={styles.title}>Peso: </Text>
                </View>
                <View>
                  <Text>{visit.visitParams?.weight}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.stats.item]}>
                <View>
                  <Text style={styles.title}>Temperatura: </Text>
                </View>
                <View>
                  <Text>{visit.visitParams?.temperature}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.stats.item]}>
                <View>
                  <Text style={styles.title}>Pulso: </Text>
                </View>
                <View>
                  <Text>{visit.visitParams?.heartbeat}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.row]}>
              <View style={[styles.row, styles.stats.item]}>
                <View>
                  <Text style={styles.title}>Ritmo Cardiaco: </Text>
                </View>
                <View>
                  <Text>{visit.visitParams?.heartRate}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.stats.item]}>
                <View>
                  <Text style={styles.title}>Ritmo Respiratorio: </Text>
                </View>
                <View>
                  <Text>{visit.visitParams?.breathingFrequency}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.stats.item]}>
                <View>
                  <Text style={styles.title}>Palpacion Abdominal: </Text>
                </View>
                <View>
                  <Text>{visit.visitParams?.abdominalPalpation}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={{ textAlign: 'center' }}>Sumario De Medicamentos</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.info.data}>
            <View style={[styles.row, styles.summary.titleRow]}>
              <View style={styles.summary.column}>
                <Text style={styles.title}>Nombre Producto</Text>
              </View>
              <View style={styles.summary.column}>
                <Text style={styles.title}>Marca</Text>
              </View>
              <View style={styles.summary.column}>
                <Text style={styles.title}>Detalle</Text>
              </View>
              <View style={styles.summary.column}>
                <Text style={styles.title}>Dosis</Text>
              </View>
            </View>
            {visit.medicines?.map((item) => (
              <View style={[styles.row, styles.summary.item]}>
                <View style={styles.summary.column}>
                  <Text>{item.product}</Text>
                </View>
                <View style={styles.summary.column}>
                  <Text>{item.brand}</Text>
                </View>
                <View style={styles.summary.column}>
                  <Text>{item.kind}</Text>
                </View>
                <View style={styles.summary.column}>
                  <Text>{item.dose}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed /> */}
      </Page>
    </Document>
  );
}
