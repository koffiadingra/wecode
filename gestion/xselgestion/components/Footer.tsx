import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-4 text-center border-t mt-auto">
      <p>&copy; {new Date().getFullYear()} Mon Dashboard. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
