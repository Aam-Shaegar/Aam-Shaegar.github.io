import React from "react";

export default function LinksSection() {
  return (
    <section 
      id="hrefs" 
      style={{
        backgroundColor: "#f2f2f2",
        padding: "14px",
        borderRadius: "4px"
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "12px" }}>Список ссылок</h2>
      <ul style={{ margin: 0, paddingLeft: "1.1em" }}>
        <li>
          <a href="http://kubsu.ru/" title="Главная КубГУ(https)">
            КубГУ(http)
          </a>
        </li>

        <li>
          <a href="https://kubsu.ru/" title="Главная КубГУ(http)">
            КубГУ(https)
          </a>
        </li>

        <li>
          <a href="https://kubsu.ru/" title="">
            <img 
              src="image.jpg" 
              alt="КубГу" 
              width="224" 
              height="168" 
              title="Опять КубГУ(но через картинку)"
            />
          </a>
        </li>

        <li>
          <a href="/about" title="Информация о нас(ее нет)">
            Внутренняя страница
          </a>
        </li>

        <li>
          <a href="/" title="Переход на главную(уже тут)">
            Главная
          </a>
        </li>

        <li>
          <a href="#form" title="Форма">
            Ссылка на сегмент текущей страницы(Переход к форме)
          </a>
        </li>

        <li>
          <a 
            href="https://example.com/search?name=ivan&age=20&city=krasnodar" 
            title="Тут мог быть RequestMapping"
          >
            Ссылка с 3 параметрами
          </a>
        </li>

        <li>
          <a 
            href="https://example.com/page?id=123" 
            title="А тут всего один параметр, все равно нет RequestMapping'а"
          >
            Ссылка с id
          </a>
        </li>

        <li>
          <a 
            href="page.html" 
            title="Страниц в этом каталоге больше нет, а ссылка есть"
          >
            Страница в текущем каталоге
          </a>
        </li>

        <li>
          <a 
            href="about/page.html" 
            title="В about тоже ничего нет, как и самого about"
          >
            Относительная ссылка на страницу в каталоге about
          </a>
        </li>

        <li>
          <a 
            href="../index.html" 
            title="А вот уровнем выше перейти можно"
          >
            Относительная ссылка на страницу на уровень выше
          </a>
        </li>

        <li>
          <a 
            href="../../page.html" 
            title="На два уровня выше уже перейти нельзя"
          >
            Относительная ссылка на страницу на два уровня выше
          </a>
        </li>

        <li>
          <p style={{ margin: 0 }}>
            Тут текст, а внутри{" "}
            <a href="https://kubsu.ru/" title="КубГУ, но внутри текста">
              контекстная ссылка
            </a>
            .
          </p>
        </li>

        <li>
          <a 
            href="https://ru.wikipedia.org/wiki/HTML#История" 
            title="Фрагмент Википедии про html"
          >
            Ссылка на фрагмент Википедии
          </a>
        </li>

        <li>
          <img 
            src="image.jpg" 
            alt="КубГу" 
            width="224" 
            height="168" 
            useMap="#my-map"
          />
          <map name="my-map">
            <area 
              shape="rect" 
              coords="0,0,112,168" 
              href="https://kubsu.ru/" 
              alt="Ссылка 1 (КубГу)" 
              title="КубГУ, но прямоугольник"
            />
            <area 
              shape="circle" 
              coords="170,80,40" 
              href="https://example.com" 
              alt="Ссылка 2 (Example)" 
              title="КубГУ, но круг"
            />
          </map>
        </li>

        <li>
          <a href="" title="href пустой, а title - нет">
            Ссылка с пустым href
          </a>
        </li>

        <li>
          <a title="Тут вообще href нет, а title есть">
            ссылка без href
          </a>
        </li>

        <li>
          <a 
            href="https://example.com" 
            rel="nofollow" 
            title="Оригинальность кончилась, nofollow на example.com"
          >
            Запрещено для перехода поисковикам
          </a>
        </li>

        <li>
          <a 
            href="https://example.com" 
            rel="nofollow noindex" 
            title="а тут nofollow && noindex на example.com"
          >
            Запрещено для индексации
          </a>
        </li>

        <li>
          <ol style={{ marginTop: "4px", marginBottom: "4px" }}>
            <li>
              <a href="https://kubsu.ru/" title="Главная КубГУ">
                КубГу
              </a>
            </li>
            <li>
              <a href="https://example.com" title="Пример сайта">
                Example
              </a>
            </li>
          </ol>
        </li>

        <li>
          <a 
            href="ftp://user:password@ftp.example.com/file.txt" 
            title="FTP, но из рабочего - только ссылка"
          >
            FTP с авторизацией
          </a>
        </li>
      </ul>
    </section>
  );
}