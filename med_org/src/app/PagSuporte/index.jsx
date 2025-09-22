import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css'

function Suporte() {
    const navigate = useNavigate();

    return (
        <div className='SupTec'>
            <button className="voltar-btn" onClick={() => navigate(-1)}>← Voltar</button> 
            <form id='sup'>
                <h1 id='titulo'>Lista de Contatos para suporte:</h1>
                <h1 id='nome'>- Antônio Edson:</h1>
                <h1 id='num'>(81)xxxxx-xxxx</h1>
                <h1 id='nome'>- Dacio da Silva:</h1>
                <h1 id='num'>(81)xxxxx-xxxx</h1>
                <h1 id='nome'>- David Cândido:</h1>
                <h1 id='num'>(81)xxxxx-xxxx</h1>
                <h1 id='nome'>- Diogo Geovanni:</h1>
                <h1 id='num'>(81)xxxxx-xxxx</h1>
                <h1 id='nome'>- Lucas Mourato: </h1>
                <h1 id='num'>(81)xxxxx-xxxx</h1>
                <h1 id='nome'>- Matheus Aguilar:</h1>
                <h1 id='num'>(81)xxxxx-xxxx</h1>
                <h1 id='nome'>- Gabriel de Souza :</h1>
                <h1 id='num'>(81)xxxxx-xxxx</h1>
                <h1 id='nome'>- Arthur Felipe</h1>
                <h1 id='num'>(81)xxxxx-xxxx</h1>
            </form>
        </div>
    )
}

export default Suporte
