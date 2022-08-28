import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './error-404-styles.scss';

const Error404: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigateHome = () => {
    navigate('/pokedex')
  }
  
  return (
    <div className={Styles.mainContainer}>
      {/* <Typography> */}
        Desculpe mas essa página não foi encontrada.
      {/* </Typography> */}
      {/* <Button
        text="Encontrar o caminho de volta"
        onClick={handleNavigateHome}
      /> */}
    </div>
  )
}

export default Error404