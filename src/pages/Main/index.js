import React, { Component } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";

import Container from "../../components/Container";
import { Form, SubmitButton, List } from "./styles";
import { Link } from "react-router-dom";

import api from "../../services/api";

export default class Main extends Component {
  state = {
    newRepo: "",
    repositories: [],
    laoding: false
  };
  // Carregar os Dados do LocalStorage quando componente for criado.
  componentDidMount(){
    const repositories = localStorage.getItem('repositories');
    
    if( repositories ){
      this.setState({ repositories: JSON.parse(repositories)});
    }

  }
  // Salvar os Dados no LocalStorage quando componente atualiza.
  componentDidUpdate(_, prevState){
    //Pega lista de repos no state
    const { repositories } = this.state;
    //Compara prevState com o state atual
    if(prevState.repo !== repositories){
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  handleInputChange = e => {
    //Atribui valor do input na variavel newRepo
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    //Seta os estados.
    const { newRepo, repositories } = this.state;
    //verifica se nome do repositório esta vazio.
    if(newRepo == ""){
      alert("Por favor, digite algum nome");

      }else{
        //Atribui TRUE ao state para desbilitar botão ao executar função.
        this.setState({ laoding: true });
        //Faz a busca na api do github.
        //[WARNING] Verificar PQ a api.get não ta buscando o baseUrl  
        const response = await api.get(`http://api.github.com/repos/${newRepo}`)
        .then((response) => {
          const data = {
            name: response.data.full_name
          };
          this.setState({
            repositories: [...repositories, data],
            newRepo: "",
            laoding: false
          });  
          console.log(response);
        }, (error) => {
          this.setState({
            newRepo: "",
            laoding: false
          });

          alert("Repositório não encontrado!");
        });
        ;
        //Cria objeto para guardar as informações que for necessária.
       
    }
  };

  render() {
    const { newRepo, laoding, repositories } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton laoding={laoding}>
            { laoding ? <FaSpinner size={14} /> :  <FaPlus size={14} /> }
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
