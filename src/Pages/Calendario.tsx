import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.css';
import 'jquery-ui-dist/jquery-ui.js';
import './Calendar.css'; // Estilos personalizados aqui
import { Box, Center } from '@chakra-ui/react';
import axios from 'axios';

const Calendario: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Inicializa com um array vazio

  useEffect(() => {
    // Configuração do datepicker usando jQuery
    $("#datepicker").datepicker({
      onSelect: function(dateText) {
        $('#texto').text("Data selecionada: " + dateText);
      }
    });

    const fethData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:5000/api/apontamento' , 
          { headers: { Authorization: `Bearer ${token}` } })
        setData(response.data); // Define os dados recebidos do servidor
      } catch (error) {
        console.error("Houve um erro ao buscar os dados:", error);
      }
    }
  
    fethData();
  }, []);

  

  return (
    <>
      <Center>
        <p id='texto'></p>
      </Center>
      <div className="calendar-container">
        <Center>
          <Box w="full" maxW="1200px" textAlign="left">
            <h1>Apontamentos</h1>
          </Box>
        </Center>
        <Center>
          <Box w="full" maxW="1200px" textAlign="left">
            <div id="datepicker"></div>
            <li>
              <ul> {data.map((item) => <li>{item.data}, {item.entrada}, {item.saida}, {item.atividade}</li>)}</ul>
            </li>

          </Box>
        </Center>
      </div>
    </>
  );
};

export default Calendario;
