import React from "react";

export default function TableSection() {
  return (
    <section 
      id="table" 
      style={{
        backgroundColor: "#f2f2f2",
        padding: "14px",
        borderRadius: "4px"
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "12px" }}>Таблица</h2>
      
      <div style={{
        width: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch"
      }}>
        <table style={{
          width: "100%",
          minWidth: "600px",
          borderCollapse: "collapse",
          margin: 0
        }}>
          <thead>
            <tr>
              <th style={{
                backgroundColor: "#cfcfcf",
                padding: "10px",
                textAlign: "left",
                fontWeight: 600
              }}>
                №
              </th>
              <th style={{
                backgroundColor: "#cfcfcf",
                padding: "10px",
                textAlign: "left",
                fontWeight: 600
              }}>
                Имя
              </th>
              <th style={{
                backgroundColor: "#cfcfcf",
                padding: "10px",
                textAlign: "left",
                fontWeight: 600
              }}>
                Возраст
              </th>
              <th style={{
                backgroundColor: "#cfcfcf",
                padding: "10px",
                textAlign: "left",
                fontWeight: 600
              }}>
                Группа
              </th>
              <th style={{
                backgroundColor: "#cfcfcf",
                padding: "10px",
                textAlign: "left",
                fontWeight: 600
              }}>
                Рабочий язык программирования
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td rowSpan={3} style={{ padding: "8px", border: "1px solid #999" }}>1</td>
              <td rowSpan={3} style={{ padding: "8px", border: "1px solid #999" }}>Иванов И.И.</td>
              <td rowSpan={3} style={{ padding: "8px", border: "1px solid #999" }}>17</td>
              <td rowSpan={3} style={{ padding: "8px", border: "1px solid #999" }}>ГУО-103</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Python</td>
            </tr>
            <tr style={{ backgroundColor: "#ddd" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>JavaScript</td>
            </tr>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>PHP</td>
            </tr>

            <tr style={{ backgroundColor: "#ddd" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>2</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Петров П.П.</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>17</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>ГУО-102</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Pascal</td>
            </tr>

            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td rowSpan={3} style={{ padding: "8px", border: "1px solid #999" }}>3</td>
              <td rowSpan={3} style={{ padding: "8px", border: "1px solid #999" }}>Сидоров С.С.</td>
              <td rowSpan={3} style={{ padding: "8px", border: "1px solid #999" }}>24</td>
              <td rowSpan={3} style={{ padding: "8px", border: "1px solid #999" }}>ГЕП-808</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>C++</td>
            </tr>
            <tr style={{ backgroundColor: "#ddd" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Golang</td>
            </tr>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Java</td>
            </tr>

            <tr style={{ backgroundColor: "#ddd" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>4</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Кузнецов К.К.</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>17</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>ГУО-101</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>C#</td>
            </tr>

            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td rowSpan={2} style={{ padding: "8px", border: "1px solid #999" }}>5</td>
              <td rowSpan={2} style={{ padding: "8px", border: "1px solid #999" }}>Васильев В.В.</td>
              <td rowSpan={2} style={{ padding: "8px", border: "1px solid #999" }}>18</td>
              <td rowSpan={2} style={{ padding: "8px", border: "1px solid #999" }}>ГЕП-208</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Assembly</td>
            </tr>
            <tr style={{ backgroundColor: "#ddd" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Swift</td>
            </tr>

            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>6</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Морозов М.М.</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>19</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>ГЕП-308</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Haskell</td>
            </tr>

            <tr style={{ backgroundColor: "#ddd" }}>
              <td style={{ padding: "8px", border: "1px solid #999" }}>7</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>Зайцев З.З.</td>
              <td style={{ padding: "8px", border: "1px solid #999" }}>20</td>
              <td colSpan={2} style={{ padding: "8px", border: "1px solid #999" }}>
                Отчислен с позором
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}