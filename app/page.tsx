export default function Home() {
  return (
    <>
      <header>
        <nav className="flex">
          <ul className="flex gap-10 p-10 w-full">
            <h1>Bicla</h1>
            <li>
              <a href="#introduccion">Introducción</a>
            </li>
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#nosotros">Nosotros</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="px-10 flex flex-col gap-10">
        <section id="introduccion">
          <h1>Bicla</h1>
          <p>La mejor agencia web de la Argentina</p>
          <p>
            Si, leiste bien... te va gustando?
          </p>
          <p>
            <a href="#contacto">Escribinos</a>
          </p>
        </section>

        <section id="servicios">
          <h2>Servicios</h2>
          <ul>
            <li>
              <h3>Diseño web</h3>
              <p>
                diseño bien canchero mal
              </p>
            </li>
            <li>
              <h3>Desarrollo</h3>
              <p>
                Sitios chetos
              </p>
            </li>
            <li>
              <h3>Branding</h3>
              <p>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </p>
            </li>
            <li>
              <h3>Mantenimiento</h3>
              <p>
                Mantenimiento Mantenimiento Mantenimiento Mantenimiento Mantenimiento
              </p>
            </li>
          </ul>
        </section>

        <section id="nosotros">
          <h2>Nosotros</h2>
          <p>
            nosotros nosotros nosotros nosotros nosotros nosotros nosotros nosotros nosotros
            nosotros nosotros nosotros nosotros nosotros nosotros nosotros nosotros nosotros
          </p>
          <p>
            nosotros nosotros nosotros nosotros nosotros nosotros nosotros
          </p>
        </section>

        <section id="contacto">
          <h2>Contacto</h2>
          <p>Contanos qué necesitás y te respondemos.</p>
          <p>
            Email: <a href="mailto:hola@bicla.com">hola@bicla.com</a>
          </p>
          <p>Teléfono: +54 11 0000-0000</p>
          <form action="#" method="get">
            <p>
              <label htmlFor="nombre">Nombre</label>
              <br />
              <input id="nombre" name="nombre" type="text" required />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <br />
              <input id="email" name="email" type="email" required />
            </p>
            <p>
              <label htmlFor="mensaje">Mensaje</label>
              <br />
              <textarea id="mensaje" name="mensaje" rows={5} required />
            </p>
            <p>
              <button type="submit">Enviar</button>
            </p>
          </form>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Bicla.</p>
      </footer>
    </>
  );
}
