import Logo from "../icons/paw-solid.svg"
function Spinner() {
  const animate = {
    animation: 'rotate 1s infinite',
  };

  const keyframes = `
    @keyframes rotate {
      50% {
        transform: rotate(180deg);
      }
    }
  `;
  return (
    <div className='loadingSpinnerContainer'>
      <style>{keyframes}</style>
      <img style={animate} src={Logo} width={50} height={50} fill="#FFBA18" alt="Logo" />
    </div>
  )
}

export default Spinner
