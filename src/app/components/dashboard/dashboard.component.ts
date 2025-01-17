import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  conversionResult: string | null = null;
  binaryResult: string | null = null;
  showConversionResult = false;
  showBinaryResult = false;

  inputNumber: string = ''; 
  inputType: string = 'decimal'; 
  outputType: string = 'decimal'; 

  onNumberInputChange(event: Event) {
    this.inputNumber = (event.target as HTMLInputElement).value;
    console.log('Número ingresado:', this.inputNumber);
  }

  onInputTypeChange(event: Event) {
    this.inputType = (event.target as HTMLSelectElement).value;
    console.log('Tipo de entrada seleccionado:', this.inputType);
  }

  onOutputTypeChange(event: Event) {
    this.outputType = (event.target as HTMLSelectElement).value;
    console.log('Convertir a tipo:', this.outputType);
  }

  onTextInputChange(event: Event) {
    const text = (event.target as HTMLInputElement).value;
    console.log('Texto ingresado:', text);
  }
  

  convertNumber(event: Event) {
    event.preventDefault();
    try {
      let decimalValue: number;

      // Convertir la entrada al sistema decimal según el tipo de entrada
      switch (this.inputType) {
        case 'decimal':
          decimalValue = parseInt(this.inputNumber, 10);
          break;
        case 'binary':
          decimalValue = parseInt(this.inputNumber, 2);
          break;
        case 'hexadecimal':
          decimalValue = parseInt(this.inputNumber, 16);
          break;
        case 'octal':
          decimalValue = parseInt(this.inputNumber, 8);
          break;
        default:
          throw new Error('Tipo de entrada inválido');
      }

      if (isNaN(decimalValue)) {
        throw new Error('El número ingresado no es válido para el tipo de entrada seleccionado.');
      }

      // Convertir del sistema decimal al tipo de salida seleccionado
      let result: string;
      switch (this.outputType) {
        case 'decimal':
          result = decimalValue.toString(10);
          break;
        case 'binary':
          result = decimalValue.toString(2);
          break;
        case 'hexadecimal':
          result = decimalValue.toString(16).toUpperCase();
          break;
        case 'octal':
          result = decimalValue.toString(8);
          break;
        default:
          throw new Error('Tipo de salida inválido');
      }

      this.conversionResult = result;
      this.showConversionResult = true;
    } catch (error) {
      this.conversionResult = (error as Error).message;
      this.showConversionResult = true;
    }
  }

  // convertir texto a Binario
  convertTextToBinary(event: Event) {
    event.preventDefault();
    const textInput = (document.getElementById('textInput') as HTMLInputElement).value;

    if (textInput.length > 20) {
      this.binaryResult = 'Error: Máximo 20 caracteres.';
      this.showBinaryResult = true;
      return;
    }

    // Convertir cada carácter del texto en binario
    const binaryValues = textInput
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'));
    this.binaryResult = binaryValues.join(' ');
    this.showBinaryResult = true;
  }
}
