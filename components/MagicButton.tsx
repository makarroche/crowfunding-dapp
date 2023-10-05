
type ButtonProps = {
    action: string,
    onClick: React.Dispatch<React.SetStateAction<boolean>>
  }
  

const MagicButton = ({action, onClick}: ButtonProps) => {

  const handleClicked= () => {
    onClick(true);
  }

    return(
    <button onClick={handleClicked} type="submit" className="mt-4 mb-2 rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
       {action}
    </button>  
    ); 
}

export default MagicButton;


