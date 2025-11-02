import Titre from "./Titre";
const skills1 = [
  { titre: "Frontend" },
  { id: 1, name: "HTML" },
  { id: 2, name: "CSS" },
  { id: 3, name: "TAILWINDCSS" },
  { id: 4, name: "JAVASCRIPT" },
  { id: 4, name: "TYPSCRIPT" },
  { id: 5, name: "REACT JS" },
  { id: 6, name: "REACT-NATIVE JS" },
  { id: 7, name: "VUE JS" },
];
const skills2 = [
  { titre: "Backend" },
  { id: 1, name: "NODE jS" },
  { id: 2, name: "NEST jS" },
  { id: 3, name: "PYTHON" },
  { id: 4, name: "FLASK" },
];
const skills3 = [
  { titre: "full stack" },
  { id: 1, name: "LAMP" },
  { id: 2, name: "NEXT JS" },
  { id: 3, name: "NUXT JS" },
  { id: 4, name: "LARAVEL" },
];
const skills4 = [
  { titre: "Bases de données" },
  { id: 1, name: "MONGODB" },
  { id: 2, name: "SQL" },
  { id: 3, name: "SQLite" },
];
const Competence = () => {
  return (
    <>
      <div>
        <Titre titre="competences" />
      </div>
      <div className="space-y-10">
        <div className="object-cover border-8 border-accent rounded-box">
          {skills1.map((skill1) => (
            <div>
              <div className="text-accent text-2xl">{skill1.titre}</div>
              <span className="mt-2 text-sm">{skill1.name}</span>
            </div>
          ))}
        </div>
        <div className="object-cover border-8 border-accent rounded-box">
          {skills2.map((skill2) => (
            <div>
              <div className="text-accent text-2xl">{skill2.titre}</div>
              <span className="mt-2 text-sm">{skill2.name}</span>
            </div>
          ))}
        </div>
        <div className="object-cover border-8 border-accent rounded-box">
          {skills3.map((skill3) => (
            <div>
              <div className="text-accent text-2xl">{skill3.titre}</div>
              <span className="mt-2 text-sm">{skill3.name}</span>
            </div>
          ))}
        </div>
        <div className="object-cover border-8 border-accent rounded-box">
          {skills4.map((skill4) => (
            <div>
              <div className="text-accent text-2xl">{skill4.titre}</div>
              <span className="mt-2 text-sm">{skill4.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Competence;
