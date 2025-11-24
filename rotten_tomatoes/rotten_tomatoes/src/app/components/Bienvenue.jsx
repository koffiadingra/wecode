export default function Bienvenue() {
  return (
    <section className="mt-8 bg-[url('../../images/fo.jpg')] bg-cover bg-center">
      <div className="custom-screen py-30 text-gray-600 backdrop-blur-sm">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-white font-extrabold mx-5 sm:text-6xl">
            Bienvenue sur notre site de notation de films
          </h1>
          <div className="flex items-center justify-center">
            <p className="max-w-xl text-white">
              Ici vous avez la possibilité de noter vos films préférées et
              commentez comme vous le souhaitez.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
