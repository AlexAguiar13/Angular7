import { TestBed, inject} from '@angular/core/testing';

import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculadoraService = TestBed.get(CalculadoraService);
    expect(service).toBeTruthy();
  });

  it('deve garantir que 1 + 2 = 3',
	 inject( [CalculadoraService], (service: CalculadoraService) => {
     let soma = service.calcular(1, 2, CalculadoraService.SOMA);
     expect(soma).toEqual(3);
	 })
    );

  it('deve garantir que 1 - 3 = -2',
	 inject( [CalculadoraService], (service: CalculadoraService) => {
     let subtracao = service.calcular(1, 3, CalculadoraService.SUBTRACAO);
     expect(subtracao).toEqual(-2);
	 })
    );

  it('deve garantir que 1 / 4 = 0.25',
	 inject( [CalculadoraService], (service: CalculadoraService) => {
     let divisao = service.calcular(1, 4, CalculadoraService.DIVISAO);
     expect(divisao).toEqual(0.25);
	 })
    );

  it('deve garantir que 1 * 7 = 7',
	 inject( [CalculadoraService], (service: CalculadoraService) => {
     let multiplicacao = service.calcular(1, 7, CalculadoraService.MULTIPLICACAO);
     expect(multiplicacao).toEqual(7);
	 })
    );

   it('deve retornar 0 para uma operação invalida',
	 inject( [CalculadoraService], (service: CalculadoraService) => {
     let operacaoInvalida = service.calcular(1, 4, '%');
     expect(operacaoInvalida).toEqual(0);
	 })
    );

});
