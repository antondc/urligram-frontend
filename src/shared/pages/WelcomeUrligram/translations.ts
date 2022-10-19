type Translation = {
  hero: string;
  whoTitle: string;
  whoText: string;
  whatTitle: string;
  whatText: string;
  contact: string;
};
type Translations = {
  en: Translation;
  es: Translation;
};

export const translations: Translations = {
  en: {
    hero: 'Search. Save. Share.',
    whoTitle: 'Who',
    whoText: `
        <p>
          Welcome to Urligram.
        </p>
        <p>
          Urligram is a non-algorithmic and privacy respectful platform for bookmarking the internet.
        </p>
        <p>
          Urligram is the platform we all were missing. There are so much interesting things we find every day exploring the internet: an article you want to read later, a paper you want to discuss with your colleages, this documentary found in the last website of the web.
        </p>
        <p>
          Urligram is a tool to save the links to all these things.
        </p>
      `,
    whatTitle: 'What',
    whatText: `
      <p>
        There are only three short steps to start to use Urligram.
      </p>
      <p>
        register with your email, activate your account, and that’s it! Now you can save your links.
      </p>
      <p>
        We have developed browser extensions for Chrome and for Firefox, so you can save links while you navigate.
      </p>
      <p>
        Urligram allows you to save, browse and share bookmarks while staying private.
        <br/>
        We don’t exchange data with any other company.
        <br/>
        The feeds are sorted by criteria set by the user.
        <br/>
        The feeds don’t provide recommendations, third party ads or algorithmic based results: the data you request on any page is the data you receive.
      </p>
      <p>
        Some say the web is broken. We too; but the solution is easy: lets rebuild it.
      </p>
      <p>
        Stay curious.
      </p>
  `,
    contact: 'Contact',
  },
  es: {
    hero: 'Busca. Guarda. Comparte.',
    whoTitle: 'Quién',
    whoText: `
    <p>
      Bienvenido a Urligram.
    </p>
    <p>
      Urligram es una plataforma para guardar, buscar y compartir bookmarks no algorítmica y respetuosa con la privacidad de los usuarios.
    </p>
    <p>
      Urligram es la plataforma que llevamos tanto echando de menos en la red. Encontramos una infinidad de contenidos fascinantes cada día, hora y minuto que navegamos: un artículo que quieres leer más tarde, un documento que quieres discutir con tus colegas, un documental encontrado en la última página de internet.
    </p>
    <p>
      Urligram es una herramienta para recordar y compartir todas estas cosas.
    </p>
  `,
    whatTitle: 'Qué',
    whatText: `
    <p>
        Sólo hacen falta dos pasos para darse de alta en Urligram: registrarse con el correo y activar la cuenta. Eso es todo.
      </p>
      <p>
        Hemos desarrollado extensiones para Chrome y Firefox, de modo que puedas guardar páginas mientras navegas.
      </p>
      <p>
        Urligram te posibilita guardar, buscar y compartir bookmarks al tiempo que mantienes tu privacidad.
        <br/>
        No compartimos datos con ninguna empresa.
        <br/>
        El contenido que buscas es el que mostramos. Ni más, ni menos.
        <br/>
        Urligram no muestra recomendaciones, anuncios de otras empresas o resultados procesados por algoritmos: los datos que se buscan son los que se muestran, sin más.
      </p>
      <p>
        Hay quien dice que internet está roto. Nosotros también lo pensamos. La buena noticia es que la solución es fácil: construyamos el internet que queremos.
      </p>
  `,
    contact: 'Contacto',
  },
};
