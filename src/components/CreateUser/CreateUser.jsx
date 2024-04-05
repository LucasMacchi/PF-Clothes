import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions";
import { Formik } from "formik";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./CreateUser.module.css";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = (text) =>
    Toastify({
      text: text,
      duration: 2000,
      position: "center",
      className: Styles.toast,
      backgroundColor: "#32CD32",
    }).showToast();

  return (
    <div className={Styles.container1}>
      <button className={Styles.BackButtons} onClick={() => navigate(-1)}>
        Atrás
      </button>
      <h1 className={Styles.subtitle}>Registrar usuario</h1>
      <Formik
        initialValues={{
          username: "",
          name: "",
          lastname: "",
          mail: "",
          password: "",
          passwords: "",
          phone: "",
          storeName: null,
          banner: null,
          profilePicture: null,
          location: null,
        }}
        validate={(value) => {
          let errors = {};
          if (!value.username.length) {
            errors.username = "Ingrese nombre de usuario";
          } else if (value.username.length < 6 || value.username.length > 15) {
            errors.username = "Longitud valida desde 6 hasta 15 caracteres";
          } else if (!/[A-Za-z]{6,15}$/.test(value.username)) {
            errors.username = `No puede contener números ni caracteres especiales`;
          } else if (!value.name.length) {
            errors.name = "Ingrese su nombre";
          } else if (!/[A-Za-z]$/.test(value.name)) {
            errors.name = `No puede contener números ni caracteres especiales`;
          } else if (!value.lastname.length) {
            errors.lastname = "Ingrese su apellido";
          } else if (!/[A-Za-z]$/.test(value.lastname)) {
            errors.lastname = `No puede contener números ni caracteres especiales`;
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value.mail)
          ) {
            errors.mail = "Ingrese un correo valido";
          } else if (!value.password.length) {
            errors.password =
              "Ingrese contraseña con un minimo de 4 caracteres";
          } else if (
            value.password.length < 4 ||
            !/^\d[0-9,$]*$/.test(value.password)
          ) {
            errors.password = "Solo puede contener números";
          } else if (value.password !== value.passwords || !value.passwords) {
            errors.passwords = "La contraseña no coincide";
          } else if (!/^\d[0-9,$]*$/.test(value.phone) || !value.phone) {
            errors.phone = "Solo puede contener números";
          }
          return errors;
        }}
        onSubmit={(data, { resetForm }) => {
          let {
            username,
            name,
            lastname,
            mail,
            password,
            phone,
            storeName,
            banner,
            profilePicture,
            location,
          } = data;
          name = `${name} ${lastname}`;
          const a = {
            username,
            name,
            mail,
            password,
            phone,
            storeName,
            banner,
            profilePicture,
            location,
          };
          console.log(a);

          dispatch(createUser(a))
            .then(function (res) {
              console.log(res);
              toast(`Usuario creado con éxito,
              por favor verificar tu cuenta con el
              mensaje enviado en tu correo electronico`);
            })
            .catch(function (res) {
              console.log(res);
            });
          setTimeout(() => {
            resetForm();
            navigate("/login");
          }, 2000);
        }}
      >
        {({
          handleSubmit,
          errors,
          values,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <form className={Styles.form} onSubmit={handleSubmit}>
            <div className={Styles.entry}>
              <div className={Styles.column}>
                <input
                  type="text"
                  id="username"
                  placeholder="Nombre de usuario"
                  name="username"
                  className={Styles.form1}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                {touched.username && errors.username && (
                  <span className={Styles.error}>{errors.username}</span>
                )}
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre"
                  name="name"
                  className={Styles.form1}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="off"
                />
                {touched.name && errors.name && (
                  <div className={Styles.error}>
                    {" "}
                    <span>{errors.name}</span>{" "}
                  </div>
                )}

                <input
                  type="text"
                  id="lastname"
                  placeholder="Apellido"
                  name="lastname"
                  className={Styles.form1}
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                {touched.lastname && errors.lastname && (
                  <div className={Styles.error}>
                    {" "}
                    <span>{errors.lastname}</span>{" "}
                  </div>
                )}

                <input
                  type="email"
                  id="mail"
                  placeholder="Correo electronico"
                  name="mail"
                  className={Styles.form1}
                  value={values.mail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                {touched.mail && errors.mail && (
                  <div className={Styles.error}>
                    {" "}
                    <span>{errors.mail}</span>{" "}
                  </div>
                )}
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  name="password"
                  className={Styles.form1}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                {touched.password && errors.password && (
                  <div className={Styles.error}>
                    {" "}
                    <span>{errors.password}</span>{" "}
                  </div>
                )}
                <input
                  type="password"
                  id="repassword"
                  placeholder="Contraseña nuevamente"
                  name="passwords"
                  className={Styles.form1}
                  value={values.passwords}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                {touched.passwords && errors.passwords && (
                  <div className={Styles.error}>
                    {" "}
                    <span>{errors.passwords}</span>{" "}
                  </div>
                )}
                <input
                  type="text"
                  id="phone"
                  placeholder="Telefono"
                  name="phone"
                  className={Styles.form1}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                {touched.phone && errors.phone && (
                  <div className={Styles.error}>
                    {" "}
                    <span>{errors.phone}</span>{" "}
                  </div>
                )}
                <div>
                  {!/[A-Za-z0-9_]{6,15}$/.test(values.username) ||
                  !/[A-Za-z]$/.test(values.name) ||
                  !/[A-Za-z]$/.test(values.lastname) ||
                  !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                    values.mail
                  ) ||
                  !values.password ||
                  !(values.password.length < 4 || values.password > 15) ||
                  !/^\d[0-9,$]*$/.test(values.password) ||
                  !/^\d[0-9,$]*$/.test(values.phone) ||
                  values.passwords !== values.password ? (
                    <div>
                      <button className={Styles.btnDisabled2} disabled>
                        Registrar
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className={Styles.submit2}>
                        Registrar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <p className={Styles.footerUser}>
        Ya tiene una cuenta?{" "}
        <Link className={Styles.lognin} to="/login">
          Iniciar sesion
        </Link>{" "}
      </p>
    </div>
  );
};
export default CreateUser;
