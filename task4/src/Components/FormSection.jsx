import React from "react";

export default function FormSection() {
  return (
    <section 
      id="form" 
      style={{
        backgroundColor: "#f2f2f2",
        padding: "14px",
        borderRadius: "4px",
        textAlign: "left"
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "12px" }}>Форма</h2>
      
      <form action="#" method="post">
        <label style={{ display: "block", marginBottom: "10px" }}>
          ФИО:{" "}
          <input 
            type="text" 
            name="fio" 
            placeholder="Иванов Иван Иванович" 
            required
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "8px",
              marginTop: "6px",
              border: "1px solid #bbb",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Телефон:{" "}
          <input 
            type="tel" 
            name="phone" 
            placeholder="+7(999)123-45-67" 
            required
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "8px",
              marginTop: "6px",
              border: "1px solid #bbb",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Email:{" "}
          <input 
            type="email" 
            name="email" 
            placeholder="Ivanov@example.com" 
            required
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "8px",
              marginTop: "6px",
              border: "1px solid #bbb",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Дата рождения:{" "}
          <input 
            type="date" 
            name="birthdate" 
            required
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "8px",
              marginTop: "6px",
              border: "1px solid #bbb",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
          />
        </label>

        <div style={{ marginBottom: "10px" }}>
          <div style={{ marginBottom: "6px" }}>Пол:</div>
          <label style={{ marginRight: "12px" }}>
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              required
              style={{ marginRight: "4px" }}
            />
            Мужской
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              required
              style={{ marginRight: "4px" }}
            />
            Женский
          </label>
        </div>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Любимые языки программирования:
          <select 
            name="languages[]" 
            multiple 
            size="5" 
            required
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "8px",
              marginTop: "6px",
              border: "1px solid #bbb",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
          >
            <option>Pascal</option>
            <option>C</option>
            <option>C++</option>
            <option>JavaScript</option>
            <option>PHP</option>
            <option>Python</option>
            <option>Java</option>
            <option>Haskell</option>
            <option>Clojure</option>
            <option>Prolog</option>
            <option>Scala</option>
          </select>
        </label>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Биография:
          <textarea 
            name="bio" 
            rows="5" 
            placeholder="Расскажите, как пришли к такому выбору?"
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: "8px",
              marginTop: "6px",
              border: "1px solid #bbb",
              borderRadius: "4px",
              boxSizing: "border-box",
              resize: "vertical"
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "10px" }}>
          <input 
            type="checkbox" 
            name="contract" 
            required
            style={{ marginRight: "6px" }}
          />
          С контрактом ознакомлен(а)
        </label>

        <input 
          type="submit" 
          value="Сохранить"
          style={{
            backgroundColor: "#666",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            fontSize: "16px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#444"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#666"}
        />
      </form>
    </section>
  );
}