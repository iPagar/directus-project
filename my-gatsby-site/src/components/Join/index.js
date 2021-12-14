import React, { useState, useEffect } from "react";
import "./style.css";
import Modal from "../Modal";
import Button from "../Button";
import { useStaticQuery, graphql } from "gatsby";
import { useForm, Controller } from "react-hook-form";
import { request, gql } from "graphql-request";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import tree from "./tree.png";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className="Join-input-container">
      <div className="Join-input-title">{props.title}</div>
      <div className="Join-input-content">
        <input
          ref={ref}
          onChange={props.onChange}
          value={props.value}
          type={props.type || "text"}
          className="Join-input"
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          {...(props.register
            ? { ...props.register(props.name, props.rules) }
            : {})}
          {...props}
        />
      </div>
    </div>
  );
});

function Select(props) {
  return (
    <div className="Join-input-container">
      <div className="Join-input-title">{props.title}</div>
      <div className="Join-input">
        <select
          className="Join-input-select"
          {...props.register(props.name, props.rules)}
        >
          {props.children.map((child) => (
            <option key={child.value} value={child.value}>
              {child.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Join(props) {
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mutationErrors, setMutationErrors] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const data = useStaticQuery(graphql`
    query JoinQuery {
      directus {
        Events {
          desc
          id
          img {
            id
          }
          title
          date
        }
      }
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);
  const onSubmit = async (formData) => {
    formData.event = +formData.event;
    const query = gql`
      mutation AddSubscriber(
        $event: Int!
        $name: String!
        $email: String!
        $phone: String!
      ) {
        create_Subscribers_item(
          data: { event: $event, name: $name, email: $email, phone: $phone }
        ) {
          event {
            id
          }
          name
          email
          phone
        }
      }
    `;
    try {
      await request(
        `${data.site.siteMetadata.siteUrl}/graphql`,
        query,
        formData
      );
      setIsSent(true);
      reset();
    } catch (e) {
      setIsError(true);
      setMutationErrors(e.response.errors);
    }
  };
  const events = data.directus.Events.filter((event) => {
    return new Date(event.date) > new Date();
  });

  useEffect(() => {
    if (!props.isActive) {
      setTimeout(() => {
        setIsSent(false);
      }, 1000);
    }
  }, [props.isActive]);

  return (
    <Modal onClose={props.onClose} isActive={props.isActive}>
      {!isSent ? (
        isError ? (
          <div className="Join-success">
            <div className="Join-success-container">
              <div className="Join-success-tree">
                <img src={tree} alt="" />
              </div>
              <div className="Join-sucess-title title">Ошибка</div>
              <div className="Join-sucess-desc">
                {mutationErrors.map((error) => {
                  return <div>{error.message}</div>;
                })}
              </div>
              <div className="Join-sucess-desc-button">
                <Button
                  onClick={() => {
                    reset();
                    setIsError(false);
                    setIsSent(false);
                  }}
                >
                  Заполнить снова
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="Join">
            <div className="Join-title title">Хочу посадить дерево</div>
            <div className="Join-desc">
              Запись на участие в ближайшей высадке
            </div>
            {events.length > 0 ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className="Join-form"
              >
                {/* register your input into the hook by invoking the "register" function */}
                <Select
                  title="Выберите мероприятия"
                  name="event"
                  register={register}
                  rules={{
                    maxLength: 100,
                    required: true,
                  }}
                >
                  {events.map((event) => ({
                    title:
                      new Intl.DateTimeFormat("ru", {
                        day: "numeric",
                        month: "long",
                      }).format(new Date(event.date)) +
                      " — " +
                      event.title,
                    value: event.id,
                  }))}
                </Select>
                <Input
                  rules={{
                    maxLength: 100,
                    required: true,
                  }}
                  title="Ваше имя"
                  name="name"
                  placeholder="Павел"
                  register={register}
                />
                {errors.name && (
                  <span className="Join-input-error">Введите имя</span>
                )}
                <Input
                  rules={{
                    maxLength: 100,
                    required: true,
                  }}
                  title="E-mail"
                  type="email"
                  name="email"
                  placeholder="mail@example.com"
                  register={register}
                />
                {errors.email && (
                  <span className="Join-input-error">Введите email</span>
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Controller
                    control={control}
                    rules={{
                      maxLength: 100,
                      required: true,
                      validate: (value) => isValidPhoneNumber("+" + value),
                    }}
                    render={({ field: { onChange, value } }) => (
                      <div className="Join-input-container">
                        <div className="Join-input-title">Телефон</div>
                        <div className="Join-input-content">
                          <PhoneInput
                            countryCodeEditable={false}
                            country="ru"
                            disableDropdown
                            value={value}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                    )}
                    name="phone"
                  />
                </div>
                {errors.phone && (
                  <span className="Join-input-error">
                    Неверный номер телефона
                  </span>
                )}

                <div className="Join-submit-button">
                  <Button type="submit">Отправить</Button>
                </div>
              </form>
            ) : (
              <div className="Join-desc">Нет ближайших мероприятий</div>
            )}
          </div>
        )
      ) : (
        <div className="Join-success">
          <div className="Join-success-container">
            <div className="Join-success-tree">
              <img src={tree} alt="" />
            </div>
            <div className="Join-sucess-title title">Спасибо!</div>
            <div className="Join-sucess-desc">
              Заявка отправлена, вам ответят в ближайшее время
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default Join;
