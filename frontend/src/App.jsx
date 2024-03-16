import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import "./components/NotesLayout.jsx"
function App() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <div className="sidebar">
              <div className="menu">
                <div className="menu-item">Today</div>
                <div className="menu-item">Search and Sidebar Creation</div>
                <div className="menu-item">NPM Script Troubleshooting</div>
                <div className="menu-item">Connect MongoDB in Another File</div>
                <div className="menu-item">Yesterday</div>
                <div className="menu-item">Insert Many Academic Documents</div>
                <div className="menu-item">
                  Find Smallest Remaining Difficulty
                </div>
                <div className="menu-item">Memory Units: Smallest Bit</div>
                <div className="menu-item">Memory Setting Function: memset</div>
                <div className="menu-item">Struct in C++: Basics</div>
                <div className="menu-item">Start Time Calculation</div>
                <div className="menu-item">Input Processes from User</div>
                <div className="menu-item">Previous 7 Days</div>
                <div className="menu-item">Fetch API Data Display</div>
                <div className="menu-item">Lemon juice for throat?</div>
                <div className="menu-item">Validation Failure Handling</div>
                <div className="menu-item">Define Transaction Assignment</div>
                <div className="menu-item">Promisify Transaction Gateway</div>
                <div className="menu-item">Process Forking Logic</div>
                <div className="menu-item">Data Overwrite Process</div>
                <div className="menu-item">Code Help Requested Summarizer</div>
                <div className="menu-item">
                  Checkout with Braintree Integration
                </div>
              </div>
            </div>
          </div>
          <div className="col-9 side-bigger">
            <div className="main">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur neque sapiente ex est dicta cupiditate minima quod
                  temporibus quasi soluta! Repudiandae, itaque porro officia
                  consequatur perspiciatis officiis ipsa alias recusandae!
                  Laudantium ducimus magni doloremque reprehenderit iste atque
                  rerum hic. Illo, facere corrupti temporibus pariatur
                  exercitationem qui esse earum aliquid quasi, itaque autem
                  dolor error ab at, asperiores iste ipsa nostrum. Quas delectus
                  ullam velit, odit cumque natus aliquam rerum maiores illum
                  iusto, est voluptatibus ratione corrupti omnis porro!
                  Temporibus, et. Cum culpa quisquam quam numquam beatae at
                  libero animi natus? Dolor, molestias sit laborum obcaecati
                  voluptatum quam. Delectus cupiditate aperiam minus praesentium
                  quod, aliquid dolorem tempora. Illo recusandae, et omnis sequi
                  commodi totam veritatis incidunt ut aperiam placeat excepturi!
                  Neque? Culpa error labore non am Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Maiores animi aspernatur
                  mollitia harum vel totam dolorem architecto tempora ab
                  reiciendis voluptatibus praesentium quos voluptas, modi qui?
                  Dolore in aspernatur corrupti! Nihil atque quidem, optio
                  fugiat rerum error consequuntur repellendus eligendi. Commodi,
                  possimus praesentium. Officiis obcaecati, cumque hic quia
                  molestiae placeat ad voluptatum odio sapiente exercitationem,
                  corporis, voluptatibus ducimus quibusdam iure. Dignissimos e
                  quia amet maiores perspiciatis vel dicta voluptatibus, a minus
                  impedit exercitationem. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Nesciunt pariatur expedita
                  nostrum iure, officia veritatis consequatur veniam tempora,
                  quae, nobis seq Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quibusdam a quasi dolore aliquid incidunt,
                  inventore eveniet. Laborum dolorem vitae asperiores non,
                  rerum, beatae eum nam saepe sit reprehenderit nesciunt
                  voluptatibus! Incidunt saepe maxime aspernatur nulla quas
                  beatae quod aliquam quos. Sunt exercitationem voluptatem
                  tempore accusantium fuga accusamus voluptatibus repellendus
                  quas vitae odio iste, alias dolorum repudiandae excepturi
                  itaque ab ea! Dolorum repellat architecto cupiditate. Animi
                  minima ipsa placeat molestias quod eius aperiam voluptatibus
                  autem consequatur quis. Eos aliquam odio nostrum deserunt
                  earum optio porro maxime maiores, accusantium, incidunt
                  voluptas ipsam. Expedita sequi voluptatibus earum accusantium
                  quam doloribus! Recusandae saepe quis quidem quam sed
                  temporibus sunt quas odit modi veniam dicta hic, nisi qui
                  consequatur rem optio beatae ipsa ullam repudiandae nemo
                  laborum, accusamus, tempore quas sapiente deserunt asperiores
                  error eos qui, blanditiis dignissimos magni exercitationem.
                  Necessitatibus aliquid eaque pariatur iure harum! Nobis in
                  corrupti repellat id laudantium ea quis soluta maxime illum
                  temporibus libero qui ab voluptatum est voluptate obcaecati
                  officia, rerum aliquam earum aspernatur. Reprehenderit eius
                  quisquam mollitia deserunt dolore fuga natus eum, veritatis
                  nisi, quibusdam officia. Provident, sequi dolores! Quod
                  deleniti ab consequatur facilis quae. Beatae asperiores maxime
                  blanditiis libero culpa eaque ullam. ui impedit sunt a?
                  Corrupti eum dolores blanditiis itaque consectetur! Cumque
                  eius praesentium eligendi unde deserunt, atque fugiat? Veniam
                  excepturi minus velit nesciunt nulla odit dolor saepe deleniti
                  impedit. Repellat, possimus nulla accusantium quidem
                  consectetur eum ab. Veniam dicta animi, nisi provident
                  laudantium molestiae et consequatur cum illo nulla cumque
                  pariatur earum blanditiis nemo, neque a dolorum mollitia
                  voluptas! Veritatis ullam architecto pariatur impedit adipisci
                  laborum voluptate?
                </p>
              </div>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search "
                  className="search-input"
                />
                <button className="search-button">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
