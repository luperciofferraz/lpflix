import React , { useState, useEffect } from 'react';
import FormField from '../../../components/FormField';
import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';

function CadasTroCategoria() {

    const valoresIniciais = {

        nome: '',
        descricao: '',
        cor: '',

    };

    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor) {

        setValues({

            ...values,
            [chave]: valor,

        })
    }

    function handleChange(infosDoEvento) {
        
        setValue(
            infosDoEvento.target.getAttribute('name'), 
            infosDoEvento.target.value
        );
    }


    useEffect(() => {
        
        const URL = 'http://localhost:8080/categorias'; 
        
        fetch(URL)
        .then(async (respostaDoServer) => {
        
            if(respostaDoServer.ok) {
                const resposta = await respostaDoServer.json();
                setCategorias(resposta);
                return; 
            }

            throw new Error('Não foi possível pegar os dados');
        })

    }, []);

    return  (

        <PageDefault>

            <h1>Cadastro de Categoria: {values.nome}</h1> 

            <form onSubmit = {function handleSubmit(infosDoEvento) {
                    infosDoEvento.preventDefault();
                    setCategorias([
                        ...categorias, values
                    ]);

                    setValues(valoresIniciais);
                }}> 

                <FormField
                    label = "Nome da Categoria"
                    type = "text"
                    name = "nome"
                    value = {values.nome}
                    onChange = {handleChange}

                />

                <FormField
                    label = "Descrição"
                    type = "textarea"
                    name = "descricao"
                    value = {values.descricao}
                    onChange = {handleChange}

                />

                <FormField
                    label = "Cor"
                    type = "color"
                    name = "cor"
                    value = {values.cor}
                    onChange = {handleChange}

                />

                <Button>

                    Cadastrar

                </Button>

            </form>

            {categorias.length === 0 && (

                <div>
                    Loading...
                </div>

            )}

            <ul>
                  {categorias.map( (categoria) => {
                        return (
                            <li key = {`${categoria.titulo}`}>
                                {categoria.titulo}        
                            </li>
                        )
                    })
                  }      
            </ul>


            <Link to="/">

                Ir para Home
            
            </Link>

        </PageDefault>

    );

}
export default CadasTroCategoria;