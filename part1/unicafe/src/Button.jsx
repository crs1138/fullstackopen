const Button = ({ children, handleClick }) => (
  <button type="button" onClick={handleClick}>
    {children}
  </button>
);

export default Button;
