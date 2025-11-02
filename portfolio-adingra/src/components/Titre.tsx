interface TitreProps {
  titre: string;
}
const Titre = ({ titre }: TitreProps) => {
  return (
    <>
      <h1 className="uppercase font-bold mb-5 text-center text-3xl">
        {titre}
      </h1>
    </>
  );
};

export default Titre;
