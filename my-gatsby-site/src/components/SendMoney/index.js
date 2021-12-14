import React from "react";
import "./style.css";
import Modal from "../Modal";
import QR from "./QR.png";
import useWindowWidth from "../../hooks/useWindowWidth";

function SendMoney(props) {
  const width = useWindowWidth();
  return (
    <Modal onClose={props.onClose} isActive={props.isActive}>
      <div className="SendMoney">
        <div className="SendMoney-content">
          <div className="SendMoney-title title">
            Хочу пожертвовать на покупку саженцев
          </div>
          <div className="SendMoney-desc">
            <strong>
              Каждое посаженное дерево – это вклад в благоприятную экологическую
              обстановку.
            </strong>
            <br />
            Вы можете стать волонтером и записаться на высадку, но если не
            хочется — пожертвуйте на покупку саженцев! Надежным и проверенным
            партнером проекта «Зелёный каркас» является калининградский
            благотворительный фонд «Благоустройство и взаимопомощь». Фонд уже
            несколько лет успешно воплощает в жизнь социально важные проекты с
            частными пожертвованиями. Ваша поддержка важна для нас. Совместными
            усилиями мы сделаем наш город зеленым!
          </div>
          {width <= 800 && (
            <div className="SendMoney-img-conteiner">
              <img src={QR} alt="" className="SendMoney-img" />
            </div>
          )}
          <div className="SendMoney-list">
            <strong>
              <ol>
                <li>Авторизуйтесь в приложении СберБанк Онлайн</li>
                <li>Выберите Оплату по QR-коду</li>
                <li>Отсканируйте код с изображения</li>
                <li>Укажите желаемую сумму</li>
                <li>Подтвердите операцию</li>
              </ol>
            </strong>
          </div>
        </div>
        {width > 800 && (
          <div className="SendMoney-img-conteiner">
            <img src={QR} alt="" className="SendMoney-img" />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default SendMoney;
