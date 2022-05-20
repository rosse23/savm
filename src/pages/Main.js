import React from "react";
import Head from "../components/mainHead/Head.js";
import classes from "./Main.module.css";
import g1 from "../imgs/grid2cols1.jpg";
import g2 from "../imgs/grid2cols2.jpg";
import logo from "../imgs/logo.png";
const Main = () => {
  return (
    <div className={classes.Main}>
      <div className={classes.banner}>
        <Head />
        <div class={classes.title}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className={classes.container}>
        <section>
          <h2>SOBRE NOSOTROS</h2>
          <div className={classes.c1}>
            <div className={classes.grid2cols}>
              <div className={classes.box1}>
                <img src={g1} alt="pet" />
                <div className={classes.boxg2}>
                  <h3>Quienes Somos</h3>
                  <p>
                    Veterinaria con atención los 7 días de la semana. Con más de
                    15 años de experiencia en el área,proporcionamos productos y
                    servicios Médicos veterinarios de forma integral.
                  </p>
                </div>
              </div>
              <div className={classes.box1}>
                <img src={g2} alt="pet" />
                <div className={classes.boxg2}>
                  <h3>Nuestro equipo</h3>
                  <p>
                    Contamos con personal profesional capacitado para ofrecerle
                    un verdadero servicio clínico a sus mascotas, no solo en
                    casos de emergencia, sino también en la casuítica diaria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={classes.cp2}>
          <h2>NUESTROS SERVICIOS</h2>
          <p>
            Una mascota es parte de la familia y requiere de los mejores
            cuidados posibles.
          </p>
          <div className={classes.c1}>
            <div className={classes.grid3cols}>
              <div className={classes.box1}>
                <img src={g2} alt="pet" />
                <div className={classes.boxg2}>
                  <h3>Consulta Veterinaria</h3>
                  <p>
                    En nuestra consulta veterinaria, dedicamos el tiempo que sea
                    necesario para la buena valoración de su mascota,
                  </p>
                </div>
              </div>
              <div className={classes.box1}>
                <img src={g2} alt="pet" />
                <div className={classes.boxg2}>
                  <h3>Nuestro equipo</h3>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Natus similique adipisci praesentium.
                  </p>
                </div>
              </div>
              <div className={classes.box1}>
                <img src={g2} alt="pet" />
                <div className={classes.boxg2}>
                  <h3>Nuestro equipo</h3>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Natus similique adipisci praesentium.
                  </p>
                </div>
              </div>
              <div className={classes.box1}>
                <img src={g2} alt="pet" />
                <div className={classes.boxg2}>
                  <h3>Nuestro equipo</h3>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Natus similique adipisci praesentium.
                  </p>
                </div>
              </div>
              <div className={classes.box1}>
                <img src={g2} alt="pet" />
                <div className={classes.boxg2}>
                  <h3>Nuestro equipo</h3>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Natus similique adipisci praesentium.
                  </p>
                </div>
              </div>
              <div className={classes.box1}>
                <img src={g2} alt="pet" />
                <div className={classes.boxg2}>
                  <h3>Nuestro equipo</h3>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Natus similique adipisci praesentium.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;
