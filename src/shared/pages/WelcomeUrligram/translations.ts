type Translation = {
  hero: string;
  whoTitle: string;
  whoText: string;
  image1: string;
  image1Text: string;
  image2: string;
  image2Text: string;
  image3: string;
  image3Text: string;
  image4: string;
  image4Text: string;
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
    hero: 'You brief. We create. It works.',
    whoTitle: 'Who',
    whoText: `
        <p>
          Urligram was born to build reliable, efficient and maintainable systems that empowers its users.
        </p>
        <p>
          To open questions about the limits and opportunities of software from a social perspective Urligram promotes the work of authors focused on the technological and social developments of digital industries.
        </p>
        <p>
          Technology, culture and society interact as parts of the same system. The goal of Urligram is to achieve positive impact through these three perspectives.
        </p>
      `,
    image1: 'Rational',
    image1Text: 'Systems should be as rational and comprehensible as possible.',
    image2: 'Emotional',
    image2Text: 'Systems that embraces values and communicate them to the end user.',
    image3: 'Ethical',
    image3Text: 'Code should inform and empower its end users to decide what or what not to do.',
    image4: 'Aesthetical',
    image4Text: 'Applications should express its funcionality via its aesthetics.',
    whatTitle: 'What',
    whatText: `
      <p>
        Urligram develop and offer solutions for projects on different formats and media.
      </p>
      <p>
        Its key areas of expertise are software development with a main focus on web technologies, as well as graphic design both for digital and printed supports.
      </p>
      <p>
        Urligram work along several partners and clients, providing support on operating and maintaining their systems, as well as developing new features.
      </p>
      <p>
        Urligram offers to the public several publications aimed to open questions related to the social impact of digital technologies.
      </p>
  `,
    contact: 'Contact',
  },
  es: {
    hero: 'You brief. We create. It works.',
    whoTitle: 'Quién',
    whoText: `
    <p>
      Urligram surgió para producir programas eficientes, confiables y mantenibles que empoderen a sus usuarios.
    </p>
    <p>
      Con la finalidad de abrir un debate acerca de los límites y oportunidades del software desde una perspectiva social, Urligram da soporte y promueve el trabajo de autores centrados en la evolucion de las industrias digitales desde un punto de vista social y tecnológico.
    </p>
    <p>
      Cultura, tecnología y sociedad interactúan como partes de un mismo sistema. El objetivo de Urligram es producir valor desde estas tres perspectivas.
    </p>
  `,
    image1: 'Racionalidad',
    image1Text: 'Nuestro objetivo es construir sistemas racionales y comprensibles.',
    image2: 'Emoción',
    image2Text: 'El software debe comunicar sus valores al usuario final.',
    image3: 'Ética',
    image3Text: 'Código que informa y empodera a sus usuarios.',
    image4: 'Estética',
    image4Text: 'Aplicaciones que expresan funcionalidad a través de la forma.',
    whatTitle: 'Qué',
    whatText: `
    <p>
      Urligram desarrolla y ofrece soluciones para proyectos en diferentes formatos y medios.
    </p>
    <p>
      Las areas clave de experiencia que domina son el desarrollo de sofware, con las tecnologías web como principal foco de atención, así como el diseño gráfico para medios impresos y digitales.
    </p>
    <p>
      Urligram trabaja conjuntamente con diversos socios y clientes, proveyendo soporte en la operación y mantenimiento de sus sistemas así como desarrollando nuevas funcionalidades.
    </p>
    <p>
      Urligram ofrece al público diversas publicaciones destinadas a abrir cuestiones relacionadas con el impacto social de las tecnologías digitales.
    </p>
  `,
    contact: 'Contacto',
  },
};
