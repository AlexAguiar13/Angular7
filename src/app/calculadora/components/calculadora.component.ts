import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

	private numero1: string;
	private numero2: string;
	private operacao: string;
	private resultado: number;

  constructor(private calcularodaService: CalculadoraService) { }

  ngOnInit() {
  	this.limpar();
  }

  limpar(): void{
  	this.numero1 = '0';
  	this.numero2 = null;
  	this.operacao = null;
  	this.resultado = null;
  }

  /**
  *adiciona o número selecionado para o cálculo posteriormente.
  *@param string numero
  *@return void
  */
  adicionarNumero(numero: string): void{
  	if (this.operacao === null) {
  		this.numero1 = this.concatenarNumero(this.numero1, numero);
  	} else {
  		this.numero2 = this.concatenarNumero(this.numero2, numero);
  	}
  }


  /**
  *Retorna o valor concatenado. Trata o separador decimal.
  *@param string numAtual
  *@param string numConcat
  *@return string
  */
  concatenarNumero(numAtual: string, numConcat: string): string {
  	//caso contenha apenas '0' ou null, renicia o valor
  	if (numAtual === '0' || numAtual === null) { 
  	 	numAtual = '';
  	 } 

  	 //primeiro digito é '.', concatena '0' antes do ponto
  	 if (numConcat === '.' && numAtual ===  '') {
  	 	return '0.';
  	 }

  	 //caso digitado '.' e já contenha '.' apenas retorne
  	 if (numConcat === '.' && numAtual.lastIndexOf('.') > -1) {
  	 	return numAtual;
  	 }

  	 return numAtual + numConcat;
  }

  /**
   * Executa lógica quando um operador for selecionado.
   * Caso já possua uma operação selecionada, executa a 
   * operação anterior, e define a nova operação.
   *
   * @param string operacao
   * @return void
   */
   definirOperacao(operacao: string): void {
   	//apenas difine qual operação caso não exista
   	if (this.operacao === null) {
   		this.operacao = operacao;
   		return;
   	}

   	/*caso a operação esteja definida e o número 2 definido,
   	  efetua o cálculo da operação*/
   	  if (this.numero2 !== null) {
   	  	this.resultado = this.calcularodaService.calcular(
   	  		parseFloat(this.numero1),
   	  		parseFloat(this.numero2),
   	  		this.operacao);
   	  	this.numero1 = this.resultado.toString();
   	  	this.numero2 = null;
   	  	this.operacao = operacao;
   	  	this.resultado = null;
   	  }

   }

   /**
   * Efetua o cálculo de uma operação.
   * @return void
   */
   calcular(): void {
   	if (this.numero2 === null) {
   		return;
   	}
   	this.resultado = this.calcularodaService.calcular(
   		parseFloat (this.numero1),
   		parseFloat (this.numero2),
   		this.operacao
   		);
   }

   /**
   * Retorna o valor a ser exibido na tela da calculadora.
   * @return string
   */
   get display(): string {
   	if (this.resultado !== null) {
   		return this.resultado.toString();
   	}
   	if (this.numero2 !== null) {
   		return this.numero2;
   	}
   	return this.numero1;

   	}

}

