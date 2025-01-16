
const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-md text-zinc-500">
      © 2024 - {new Date().getFullYear()}. Created by{" "}
      <a
        href="https://gerardabc.tech"
        className="text-zinc-600 hover:underline"
      >
        GerardABC
      </a>
    </footer>
  );
};

export default Footer;
