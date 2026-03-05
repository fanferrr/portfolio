export type About = {
  bio: string;
};

const about: About = {
  bio: "Desarrollo automatizaciones y flujos que conectan herramientas y equipos. Trabajo con PYMEs y equipos que quieren menos trabajo manual y más control sobre sus procesos, sin inventar números: priorizo claridad en el problema y en lo que se automatiza. Si quieres hablar de tu caso, agenda una llamada.",
};

export function getAbout(): About {
  return about;
}
