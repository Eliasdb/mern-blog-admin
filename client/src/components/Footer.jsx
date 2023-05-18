const Footer = () => {
  return (
    <footer className="footer">
      <small className="copy">
        &copy; {new Date().getFullYear()} by{" "}
        <a href="https://elias-de-bock.netlify.app/" className="font-bold">
          elias
        </a>
      </small>
    </footer>
  );
};
export default Footer;
