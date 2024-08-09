import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Produto } from '../modelo/Produto';
import { ProdutoService } from '../servico/produto.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  vetor:Produto[] = [];

  btnCadastrar:boolean = true;

  formulario = new FormGroup({
    id:    new FormControl(null),
    nome:  new FormControl(''),
    valor: new FormControl(null)
  });

  constructor(private servico:ProdutoService){}

  ngOnInit(){
    this.selecionar();
  }

  selecionar(){
    this.servico.selecionar().subscribe(retorno => {this.vetor = retorno});
  }

  cadastrar(){
    this.servico.cadastrar(this.formulario.value as Produto).subscribe(retorno => {
      this.vetor.push(retorno);
      this.formulario.reset();
    });
  }

  selecionarProduto(indice:number){
    this.formulario.setValue({
      id : this.vetor[indice].id,
      nome : this.vetor[indice].nome,
      valor : this.vetor[indice].valor
    });

    this.btnCadastrar = false;
  }

  alterar (){
    this.servico.alterar(this.formulario.value as Produto).subscribe(retorno => {
      let indiceAlterado = this.vetor.findIndex(obj => {
        return this.formulario.value.id === obj.id;
      });

    this.vetor[indiceAlterado] = retorno;

    this.formulario.reset();

    this.btnCadastrar = true;

    })
  }

  remover(){
    this.servico.remover(this.formulario.value.id).subscribe(() => {
      let indiceRemovido = this.vetor.findIndex(obj => {
        return obj.id === this.formulario.value.id;
      });

    this.vetor.splice(indiceRemovido, 1);

    this.formulario.reset();

    this.btnCadastrar = true;
    });
  }

}